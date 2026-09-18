const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 递归收集文件，排除 node_modules 和 data
function getAllFiles(dir, baseDir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const relPath = path.relative(baseDir, fullPath);
    
    // 排除特定目录
    if (relPath.startsWith('backend' + path.sep + 'node_modules') || 
        relPath.startsWith('backend\\node_modules') ||
        relPath.startsWith('node_modules') ||
        relPath.startsWith('.git') ||
        file.endsWith('.zip') ||
        file === 'zip.ps1') {
      return;
    }

    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, baseDir, fileList);
    } else {
      fileList.push(fullPath);
    }
  });
  return fileList;
}

const projectRoot = path.resolve(__dirname, '..');
console.log('Project root:', projectRoot);
const allFiles = getAllFiles(projectRoot, projectRoot);
console.log(`Found ${allFiles.length} files to package.`);

// 写入文件列表供 PowerShell 打包
const listFile = path.join(__dirname, 'files_to_zip.txt');
fs.writeFileSync(listFile, allFiles.join('\n'), 'utf-8');

// 输出压缩包到当前项目根目录
const targetZip = path.join(projectRoot, 'zgj_update_package.zip');
const psCode = `
$lines = Get-Content -LiteralPath "${listFile}"
Compress-Archive -LiteralPath $lines -DestinationPath "${targetZip}" -Force
Write-Host "Success: ${targetZip}"
`;

fs.writeFileSync(path.join(__dirname, 'run_zip.ps1'), psCode, 'utf-8');
