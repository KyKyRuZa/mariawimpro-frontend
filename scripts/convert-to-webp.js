import sharp from 'sharp';
import { readdir, stat, rm } from 'fs/promises';
import { join } from 'path';

const assetsDir = './src/styles/assets';
const quality = 80;

async function convertToWebP() {
  try {
    const files = await readdir(assetsDir);
    const imageFiles = files.filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));

    if (imageFiles.length === 0) {
      console.log('⚠️ Нет файлов для конвертации');
      return;
    }

    console.log(`🔍 Найдено ${imageFiles.length} файлов для конвертации:\n`);

    for (const file of imageFiles) {
      const inputPath = join(assetsDir, file);
      const outputPath = inputPath.replace(/\.(png|jpe?g)$/i, '.webp');
      
      const stats = await stat(inputPath);
      const oldSize = stats.size;

      await sharp(inputPath)
        .webp({ quality })
        .toFile(outputPath);

      const newStats = await stat(outputPath);
      const newSize = newStats.size;
      const savings = ((1 - newSize / oldSize) * 100).toFixed(1);

      console.log(`✓ ${file}`);
      console.log(`  → ${file.replace(/\.(png|jpe?g)$/i, '.webp')}`);
      console.log(`  (${(oldSize/1024).toFixed(0)} KB → ${(newSize/1024).toFixed(0)} KB, экономия ${savings}%)\n`);
    }

    console.log('✅ Конвертация завершена!');
    console.log('\n📝 Не забудьте:');
    console.log('   1. Обновить импорты в JSX файлах');
    console.log('   2. Обновить пути в CSS файлах');
    console.log('   3. Удалить старые .png и .jpg файлы');
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
    process.exit(1);
  }
}

convertToWebP();
