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
  'LOGISTICS CHAIN PHOTO.jpg',
  'A seacfood companeyteam photo showing thumbs up sign.png',
  'vid.mp4',
  'sitemap.xml',
  'robots.txt',
  '1.jpeg',
  '2.webp',
  '3.jpeg',
  '4.jpeg',
  '5.jpeg',
  '6.jpeg',
  '7.jpeg',
  'crab3d.js',
  'crab3d-simple.js'
];

// Function to copy directory recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy models folder if it exists
const modelsSrc = path.join(__dirname, 'models');
const modelsDest = path.join(distDir, 'models');
if (fs.existsSync(modelsSrc)) {
  copyDir(modelsSrc, modelsDest);
  console.log(`✅ Copied: models/ folder`);
} else {
  console.log(`⚠️  Models folder not found.`);
}

// Also check for GLB file in root and copy to models
const glbFiles = ['little_crab.glb', 'crab.glb'];
glbFiles.forEach(file => {
  const srcPath = path.join(__dirname, file);
  if (fs.existsSync(srcPath)) {
    const destPath = path.join(modelsDest, file);
    if (!fs.existsSync(modelsDest)) {
      fs.mkdirSync(modelsDest, { recursive: true });
    }
    fs.copyFileSync(srcPath, destPath);
    console.log(`✅ Copied: ${file} to models/`);
  }
});

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

// Certificate files are now included in filesToCopy array above

console.log('\n✨ Build complete! Files are in the "dist" folder.');
console.log('📦 Ready for deployment!\n');

