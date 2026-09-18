const fs = require('fs');
const path = require('path');

const files = [
  path.join(__dirname, '../assets/DashboardView-DrYXV8tE.js'),
  path.join(__dirname, 'public/vue/assets/DashboardView-DrYXV8tE.js')
];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let content = fs.readFileSync(f, 'utf-8');
    const target = 'function oe(w){ft(w),ne()}';
    const replacement = 'function oe(w){if(i.value){ft(w);ne();}}';
    if (content.includes(target)) {
      content = content.replace(target, replacement);
      fs.writeFileSync(f, content, 'utf-8');
      console.log('Successfully patched in:', f);
    } else {
      console.log('Target not found in:', f);
    }
  }
});
