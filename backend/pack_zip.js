const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const parentDir = path.resolve(rootDir, '..');
const zipFile = path.join(parentDir, 'zgj_update_latest.zip');

console.log('Project Root:', rootDir);
console.log('Target Zip File:', zipFile);

// 使用 PowerShell 的 Compress-Archive 打包（排除 node_modules 和 data 避免覆盖线上数据库）
const excludeScript = `
$source = "${rootDir}";
$dest = "${zipFile}";
if (Test-Path $dest) { Remove-Item -Force $dest }
$files = Get-ChildItem -Path $source -Exclude "node_modules", ".git", "zgj_update_latest.zip"
Compress-Archive -Path $files.FullName -DestinationPath $dest -Force
Write-Host "Zip created successfully at $dest"
`;

fs.writeFileSync(path.join(__dirname, 'zip.ps1'), excludeScript, 'utf-8');
