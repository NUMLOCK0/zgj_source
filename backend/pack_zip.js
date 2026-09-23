const path = require('path');
const { execFileSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const zipFile = path.join(path.dirname(rootDir), 'zgj_update_latest.zip');

console.log('Project Root:', rootDir);
console.log('Target Zip File:', zipFile);

execFileSync('tar', [
  '-a', '-c', '-f', zipFile, '-C', rootDir,
  '--exclude=.git',
  '--exclude=node_modules',
  '--exclude=data',
  '--exclude=backups',
  '--exclude=uploads',
  '--exclude=*.sqlite',
  '--exclude=*.db',
  '--exclude=zgj_update_latest.zip',
  '--exclude=zip.ps1',
  '.'
], { stdio: 'inherit' });

console.log('Zip created successfully at', zipFile);
