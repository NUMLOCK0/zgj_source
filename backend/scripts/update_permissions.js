const path = require('path');
const fs = require('fs');
const { createSqliteStore } = require('../src/db/sqliteStore');
const defaultDb = require('../src/config/defaultData');

async function updatePermissions() {
  const rootDir = path.join(__dirname, '..');
  const store = await createSqliteStore({ rootDir: rootDir, defaultData: defaultDb });
  const data = store.loadData();

  console.log('=== 更新前权限情况 ===');
  data.users.forEach(u => {
    console.log(`用户: ${u.username} (${u.name}), 管理员: ${!!u.isAdmin}`);
    console.log('  ', JSON.stringify(u.permissions));
  });

  // 更新所有非管理员用户的权限
  data.users.forEach(u => {
    if (!u.isAdmin) {
      if (!u.permissions) u.permissions = {};
      
      // 开启基础工作台与登记权限
      u.permissions.dashboardView = true;
      u.permissions.editConsult = true;
      u.permissions.extract = true;
      u.permissions.register = true;
      u.permissions.edit = true;
      u.permissions.viewData = true;
      u.permissions.viewHistory = true;
      u.permissions.financeExtract = true;
      u.permissions.financeRegister = true;
      u.permissions.financeView = true;
      u.permissions.financeEdit = true;
      
      console.log(`已为 ${u.name} (${u.username}) 补全登记与咨询量权限`);
    }
  });

  store.saveData(data);
  console.log('\n=== 数据已成功保存至 SQLite 数据库 ===');

  // 同时更新设置界面的权限选项列表，确保后台管理界面也能显示并勾选 financeRegister
  const settingsPaths = [
    path.join(__dirname, '../assets/SettingsView-CvwbgXf0.js'),
    path.join(__dirname, 'public/vue/assets/SettingsView-CvwbgXf0.js')
  ];

  settingsPaths.forEach(p => {
    if (fs.existsSync(p)) {
      let content = fs.readFileSync(p, 'utf-8');
      const target = '["financeExtract","财税信息提取与登记"]';
      const replacement = '["financeExtract","财税信息提取与登记"],["financeRegister","财税常规登记"]';
      if (content.includes(target) && !content.includes(replacement)) {
        content = content.replace(target, replacement);
        fs.writeFileSync(p, content, 'utf-8');
        console.log(`已更新权限设置列表 UI: ${p}`);
      }
    }
  });
}

updatePermissions().catch(err => {
  console.error('更新失败:', err);
});
