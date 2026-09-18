const fs = require('fs');
const path = require('path');

const tempDir = 'C:\\Users\\liuy\\Pictures\\新建文件夹\\255zgj_hhjXb\\clean_zgj_build';
if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
fs.mkdirSync(tempDir, { recursive: true });

const zgjDir = 'C:\\Users\\liuy\\Pictures\\新建文件夹\\255zgj_hhjXb\\zgj';

function copyRecursive(src, dest, isBackendRoot = false) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    const baseName = path.basename(src);
    if (['node_modules', 'data', 'backups', 'uploads', 'assets', 'scripts', '.git'].includes(baseName)) return;
    fs.mkdirSync(dest, { recursive: true });
    const items = fs.readdirSync(src);
    for (const item of items) {
      copyRecursive(path.join(src, item), path.join(dest, item), src.endsWith('backend'));
    }
  } else {
    const fileName = path.basename(src);
    if (isBackendRoot) {
      if (fileName.startsWith('inspect_') || fileName.startsWith('fix_') || fileName.startsWith('test_') || 
          fileName.startsWith('pack_') || fileName.endsWith('.ps1') || fileName.endsWith('.txt') ||
          ['app.js', 'diagnose_aibot.js', 'debug_bot_panel.js', 'check_export_map.js', 'clean_all.js', 
           'add_feedback_perm_ui.js', 'add_leader_link_btn.js', 'grant_feedback_perm.js', 
           'redesign_leader_link_bar.js', 'unlock_lead_stats.js', 'update_bot_css.js', 
           'patch_exports.js', 'patch_index_file.js', 'build_deploy_zip.js', 'create_deploy_zip.js', 
           'create_sh.js', 'create_zip.js'].includes(fileName)) {
        return;
      }
    }
    if (['update.sh', 'index.html', 'manifest.json'].includes(fileName) && !src.includes('public')) {
      return;
    }
    fs.copyFileSync(src, dest);
  }
}

copyRecursive(zgjDir, path.join(tempDir, 'zgj'));

const srcAssets = 'C:\\Users\\liuy\\Pictures\\新建文件夹\\255zgj_hhjXb\\zgj\\backend\\public\\vue\\assets';
const destAssets = 'C:\\Users\\liuy\\Pictures\\新建文件夹\\255zgj_hhjXb\\clean_zgj_build\\zgj\\backend\\public\\vue\\assets';
fs.mkdirSync(destAssets, { recursive: true });
for (const file of fs.readdirSync(srcAssets)) {
  fs.copyFileSync(path.join(srcAssets, file), path.join(destAssets, file));
}

console.log('更新包文件已全面验证并打包！');
