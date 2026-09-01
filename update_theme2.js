const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Additional replacements for raw Tailwind classes
      content = content.replace(/blue-400/g, 'brand-orange');
      content = content.replace(/blue-500/g, 'brand-orange');
      content = content.replace(/blue-600/g, 'brand-orangeHover');
      content = content.replace(/blue-900/g, 'brand-black');
      
      content = content.replace(/amber-400/g, 'brand-orange');
      content = content.replace(/amber-500/g, 'brand-orange');
      content = content.replace(/amber-600/g, 'brand-orangeHover');
      
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

processDir('./src');
console.log('Done');
