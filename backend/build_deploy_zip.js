const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '..');
const outZip = path.resolve(__dirname, '../../zgj_deploy_latest.zip');

const list = [];
function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const fp = path.join(dir, f);
    const rel = path.relative(srcDir, fp).replace(/\\/g, '/');
    if (rel.startsWith('backend/node_modules') ||
        rel.startsWith('backend/data') ||
        rel.startsWith('backend/backups') ||
        rel.startsWith('backend/uploads') ||
        rel.endsWith('.zip') ||
        rel.endsWith('.tar.gz')) {
      continue;
    }
    const stat = fs.statSync(fp);
    if (stat.isDirectory()) {
      walk(fp);
    } else {
      list.push(fp);
    }
  }
}

walk(srcDir);

const listPath = path.join(__dirname, 'pack_list.txt');
fs.writeFileSync(listPath, list.join('\r\n'), 'utf8');

const ps1 = `
$lines = Get-Content -LiteralPath '${listPath}'
$zipPath = '${outZip}'
if (Test-Path -LiteralPath $zipPath) { Remove-Item -LiteralPath $zipPath -Force }

Add-Type -AssemblyName System.IO.Compression.FileSystem
Add-Type -AssemblyName System.IO.Compression

$baseDir = '${srcDir}'
$zip = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)

foreach ($line in $lines) {
  if ([string]::IsNullOrWhiteSpace($line)) { continue }
  $rel = $line.Substring($baseDir.Length + 1).Replace('\\', '/')
  [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $line, $rel, [System.IO.Compression.CompressionLevel]::Optimal)
}

$zip.Dispose()
Write-Host "ZIP COMPLETED SUCCESSFULLY!"
Get-Item -LiteralPath $zipPath | Select-Object Name, Length, LastWriteTime
`;

const ps1Path = path.join(__dirname, 'run_pack.ps1');
fs.writeFileSync(ps1Path, ps1, 'utf8');
