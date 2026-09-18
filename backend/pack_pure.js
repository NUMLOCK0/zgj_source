const fs = require('fs');
const path = require('path');
const archiver = (() => {
  try { return require('archiver'); } catch(e) { return null; }
})();

// 使用内置无外部依赖方案或 PowerShell 本地路径执行
const projectRoot = path.resolve(__dirname, '..');
const zipName = 'zgj_update_package.zip';
const zipPath = path.join(projectRoot, zipName);

const script = `
Set-Location -LiteralPath "${projectRoot}"
$items = Get-ChildItem -Path . -Exclude "backend", "zgj_update_package.zip"
$backendItems = Get-ChildItem -Path "backend" -Exclude "node_modules", "data", "backups"
$all = @()
$items | ForEach-Object { $all += $_.FullName }
$backendItems | ForEach-Object { $all += $_.FullName }
Compress-Archive -LiteralPath $all -DestinationPath "${zipPath}" -Force
Write-Host "ZIP_DONE: ${zipPath}"
`;

fs.writeFileSync(path.join(__dirname, 'do_zip.ps1'), script, 'utf-8');
