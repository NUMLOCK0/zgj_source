const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '../assets/DashboardView-DrYXV8tE.js'),
  path.join(__dirname, 'public/vue/assets/DashboardView-DrYXV8tE.js')
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf-8');
    
    // 保护 1: ne() 函数中的查重
    const t1 = 'orderNo:i.value.orderNo';
    const r1 = 'orderNo:i.value?i.value.orderNo:""';
    content = content.split(t1).join(r1);

    // 保护 2: 弹窗和通知中的 i.value.orderNo
    const t2 = 'i.value.orderNo?"5.0":"2.0"';
    const r2 = '(i.value&&i.value.orderNo)?"5.0":"2.0"';
    content = content.split(t2).join(r2);

    const t3 = 'i.value.orderNo?"is-five":"is-two"';
    const r3 = '(i.value&&i.value.orderNo)?"is-five":"is-two"';
    content = content.split(t3).join(r3);

    const t4 = 'i.value.orderNo?"已包含有效订单编号 · 享受 ￥5.0/条 提成":"未包含订单编号 · 按基础';
    const r4 = '(i.value&&i.value.orderNo)?"已包含有效订单编号 · 享受 ￥5.0/条 提成":"未包含订单编号 · 按基础';
    content = content.split(t4).join(r4);

    fs.writeFileSync(f, content, 'utf-8');
    console.log('Patched file:', f);
  }
});
