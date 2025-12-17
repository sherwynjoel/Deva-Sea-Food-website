const fs = require('fs');
const path = require('path');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Files to copy
const filesToCopy = [
  'index.html',
  'main.js',
  'styles.css',
  'banner.png',
  'logo.png',
  'Gemini_Generated_Image_ypm05bypm05bypm0.png',
  'WhatsApp Image 2025-12-15 at 10.09.01 AM.jpeg',
  'vid.mp4',
  'sitemap.xml',
  'robots.txt'
];

console.log('🚀 Building Deva Sea Food website...\n');

// Copy files to dist
filesToCopy.forEach(file => {
  const srcPath = path.join(__dirname, file);
  const destPath = path.join(distDir, file);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✅ Copied: ${file}`);
  } else {
    console.log(`⚠️  Not found: ${file}`);
  }
});

console.log('\n✨ Build complete! Files are in the "dist" folder.');
console.log('📦 Ready for deployment!\n');

