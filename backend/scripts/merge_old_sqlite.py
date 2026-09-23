"""Merge the previous ZGJ SQLite file into the current installation.

The previous database owns historical IDs and settings. Existing current
records are retained, with conflicting IDs remapped where needed.
"""

import argparse
import hashlib
import json
import os
import shutil
import sqlite3
import tempfile
from contextlib import closing
from datetime import datetime
from pathlib import Path


def digest(path):
    h = hashlib.sha256()
    with path.open("rb") as file:
        for chunk in iter(lambda: file.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def rows(db, table):
    return [(id_, json.loads(data)) for id_, data in db.execute(
        f"SELECT id, data FROM {table} ORDER BY id"
    )]


def put(db, table, id_, data):
    db.execute(
        f"INSERT INTO {table} (id, data) VALUES (?, ?)",
        (id_, json.dumps(data, ensure_ascii=False, separators=(",", ":"))),
    )


def meta(db, key):
    row = db.execute("SELECT value FROM app_meta WHERE key = ?", (key,)).fetchone()
    return json.loads(row[0]) if row else None


def set_meta(db, key, value):
    db.execute(
        "INSERT OR REPLACE INTO app_meta (key, value) VALUES (?, ?)",
        (key, json.dumps(value, ensure_ascii=False, separators=(",", ":"))),
    )


def checked_database(path):
    db = sqlite3.connect(path)
    if db.execute("PRAGMA integrity_check").fetchone()[0] != "ok":
        db.close()
        raise RuntimeError(f"Database integrity check failed: {path}")
    return db


def merge(previous, current):
    previous_tables = {
        name for (name,) in previous.execute(
            "SELECT name FROM sqlite_master WHERE type = 'table'"
        )
    }
    current_tables = {
        name for (name,) in current.execute(
            "SELECT name FROM sqlite_master WHERE type = 'table'"
        )
    }
    if not current_tables <= previous_tables:
        raise RuntimeError(f"Previous database lacks tables: {current_tables - previous_tables}")

    # These are the only occupied collections in the current database.
    for table in current_tables - {"app_meta", "users", "financeCustomers", "auditLogs"}:
        if current.execute(f"SELECT COUNT(*) FROM {table}").fetchone()[0]:
            raise RuntimeError(f"Unreviewed current records in {table}; migration stopped")

    previous_users = {data.get("username"): (id_, data) for id_, data in rows(previous, "users")}
    for id_, user in rows(current, "users"):
        match = previous_users.get(user.get("username"))
        if not match or match[0] != id_:
            raise RuntimeError("Current user cannot be merged without remapping references")
        old_user = match[1]
        merged = {**old_user, **user}
        merged["permissions"] = {**old_user.get("permissions", {}), **user.get("permissions", {})}
        previous.execute(
            "UPDATE users SET data = ? WHERE id = ?",
            (json.dumps(merged, ensure_ascii=False, separators=(",", ":")), id_),
        )

    finance_id = previous.execute("SELECT COALESCE(MAX(id), 0) FROM financeCustomers").fetchone()[0]
    finance_count = previous.execute("SELECT COUNT(*) FROM financeCustomers").fetchone()[0]
    finance_id_map = {}
    for old_id, record in rows(current, "financeCustomers"):
        finance_id += 1
        finance_count += 1
        finance_id_map[old_id] = finance_id
        record["id"] = finance_id
        record["seq"] = str(finance_count)
        put(previous, "financeCustomers", finance_id, record)

    audit_id = previous.execute("SELECT COALESCE(MAX(id), 0) FROM auditLogs").fetchone()[0]
    for _, log in rows(current, "auditLogs"):
        audit_id += 1
        log["id"] = audit_id
        context = log.get("context") or {}
        if context.get("recordType") == "finance":
            if "recordId" in context:
                context["recordId"] = finance_id_map[context["recordId"]]
            if "recordIds" in context:
                context["recordIds"] = [finance_id_map[id_] for id_ in context["recordIds"]]
        put(previous, "auditLogs", audit_id, log)

    # Keep historical settings; aiConfig exists only in the current database.
    for (key, value) in current.execute("SELECT key, value FROM app_meta"):
        if meta(previous, key) is None:
            set_meta(previous, key, json.loads(value))

    old_bots = meta(previous, "wecomBotConfig")
    new_bots = meta(current, "wecomBotConfig")
    if old_bots and new_bots:
        next_group = max(old_bots.get("nextGroupId", 1), max((g["id"] for g in old_bots["groups"]), default=0) + 1)
        next_bot = max(old_bots.get("nextBotId", 1), max((b["id"] for g in old_bots["groups"] for b in g.get("bots", [])), default=0) + 1)
        for group in new_bots.get("groups", []):
            group["id"] = next_group
            next_group += 1
            for bot in group.get("bots", []):
                bot["id"] = next_bot
                next_bot += 1
            old_bots["groups"].append(group)
        old_bots["nextGroupId"] = next_group
        old_bots["nextBotId"] = next_bot
        set_meta(previous, "wecomBotConfig", old_bots)

    counters = {
        "nextUserId": "users",
        "nextCustomerId": "customers",
        "nextFinanceCustomerId": "financeCustomers",
        "nextFinanceLedgerId": "financeLedger",
        "nextTaskId": "tasks",
        "nextProjectId": "projects",
        "nextConsultStatId": "consultStats",
        "nextFinanceConsultStatId": "financeConsultStats",
        "nextAuditLogId": "auditLogs",
        "nextRoiProductId": "roiProducts",
        "nextRoiRecordId": "roiRecords",
    }
    for key, table in counters.items():
        max_id = previous.execute(f"SELECT COALESCE(MAX(id), 0) FROM {table}").fetchone()[0]
        set_meta(previous, key, max(max_id + 1, meta(previous, key) or 1, meta(current, key) or 1))

    return finance_id_map


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("previous", type=Path)
    parser.add_argument("current", type=Path)
    parser.add_argument("--previous-sha256", required=True)
    parser.add_argument("--current-sha256", required=True)
    args = parser.parse_args()
    previous_path = args.previous.resolve(strict=True)
    current_path = args.current.resolve(strict=True)
    if previous_path == current_path:
        raise RuntimeError("Source and target must be different files")
    if digest(previous_path) != args.previous_sha256 or digest(current_path) != args.current_sha256:
        raise RuntimeError("A database changed after inspection; migration stopped")

    with closing(checked_database(previous_path)):
        pass
    fd, temp_name = tempfile.mkstemp(prefix=".app_migration_", suffix=".sqlite", dir=current_path.parent)
    os.close(fd)
    temp_path = Path(temp_name)
    try:
        shutil.copy2(previous_path, temp_path)
        with closing(checked_database(current_path)) as current, closing(checked_database(temp_path)) as merged:
            finance_map = merge(merged, current)
            merged.commit()
        with closing(checked_database(temp_path)) as verified:
            counts = {
                table: verified.execute(f"SELECT COUNT(*) FROM {table}").fetchone()[0]
                for table in ("customers", "financeCustomers", "users", "tasks", "auditLogs")
            }
        backup_dir = current_path.parent.parent / "backups"
        backup_dir.mkdir(exist_ok=True)
        backup_path = backup_dir / f"app_pre_migration_{datetime.now():%Y%m%d_%H%M%S}.sqlite"
        if digest(current_path) != args.current_sha256 or backup_path.exists():
            raise RuntimeError("Target changed during migration or backup name exists; migration stopped")
        shutil.copy2(current_path, backup_path)
        os.replace(temp_path, current_path)
        print(json.dumps({"backup": str(backup_path), "target": str(current_path), "counts": counts, "currentFinanceIdMap": finance_map}, ensure_ascii=False))
    finally:
        temp_path.unlink(missing_ok=True)


if __name__ == "__main__":
    main()
