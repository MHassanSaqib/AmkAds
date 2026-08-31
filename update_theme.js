const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Colors
      content = content.replace(/brand-blueLight/g, 'brand-orange');
      content = content.replace(/brand-blueDark/g, 'brand-orangeHover');
      content = content.replace(/brand-blue/g, 'brand-orange');
      content = content.replace(/brand-amberDark/g, 'brand-orangeHover');
      content = content.replace(/brand-amber/g, 'brand-orange');
      content = content.replace(/brand-navyLight/g, 'brand-greyLight');
      content = content.replace(/brand-navy/g, 'brand-black');
      content = content.replace(/brand-slate/g, 'brand-greyDark');
      content = content.replace(/brand-muted/g, 'brand-greyMedium');
      
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

processDir('./src');
console.log('Done');
