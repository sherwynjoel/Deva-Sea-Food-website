import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directories = [
  path.join(__dirname, 'public'),
  path.join(__dirname, 'src', 'assets')
];

const extensions = ['.png', '.jpg', '.jpeg'];

async function compressImages() {
  console.log('🚀 Starting image compression...');

  for (const dir of directories) {
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (extensions.includes(ext)) {
        const filePath = path.join(dir, file);
        const tempPath = path.join(dir, `temp-${file}`);
        
        try {
          const stats = fs.statSync(filePath);
          const originalSizeKB = (stats.size / 1024).toFixed(2);
          
          console.log(`📦 Compressing: ${file} (${originalSizeKB} KB)`);
          
          let pipeline = sharp(filePath);
          
          if (ext === '.png') {
            pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
          } else {
            pipeline = pipeline.jpeg({ quality: 80 });
          }
          
          await pipeline.toFile(tempPath);
          
          const newStats = fs.statSync(tempPath);
          const newSizeKB = (newStats.size / 1024).toFixed(2);
          const savings = (((stats.size - newStats.size) / stats.size) * 100).toFixed(2);
          
          if (newStats.size < stats.size) {
            fs.unlinkSync(filePath);
            fs.renameSync(tempPath, filePath);
            console.log(`✅ Success: ${file} -> ${newSizeKB} KB (Saved ${savings}%)`);
          } else {
            fs.unlinkSync(tempPath);
            console.log(`ℹ️ Skipped: ${file} (Already optimized)`);
          }
        } catch (err) {
          console.error(`❌ Error compressing ${file}:`, err.message);
          if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        }
      }
    }
  }
  
  console.log('✨ Image compression complete!');
}

compressImages();
