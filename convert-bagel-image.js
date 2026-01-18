import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// This script converts the bagel image to WebP format
// Usage: node convert-bagel-image.js <input-image-path>

const inputPath = process.argv[2];

if (!inputPath) {
  console.error('Please provide an input image path');
  console.error('Usage: node convert-bagel-image.js <input-image-path>');
  process.exit(1);
}

const outputPath = join(__dirname, 'public', 'images', 'badge-intermission-bagel.webp');

sharp(inputPath)
  .resize(512, 512, {
    fit: 'cover',
    position: 'center'
  })
  .webp({ quality: 85 })
  .toFile(outputPath)
  .then(() => {
    console.log(`✅ Image converted successfully to ${outputPath}`);
  })
  .catch((err) => {
    console.error('Error converting image:', err);
    process.exit(1);
  });
