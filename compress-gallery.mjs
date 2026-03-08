import sharp from 'sharp';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
const path = require('path');

const GALLERY_DIR = './src/assets/gallery';
const OUT_DIR = './src/assets/gallery-compressed';
const MAX_WIDTH = 1600;
const JPEG_QUALITY = 78;

async function compressImages() {
    if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

    const files = fs.readdirSync(GALLERY_DIR);
    const images = files.filter(f => /\.(jpe?g)$/i.test(f));

    console.log(`Compressing ${images.length} images into ${OUT_DIR} ...`);

    let totalBefore = 0;
    let totalAfter = 0;

    for (const file of images) {
        const inPath = path.join(GALLERY_DIR, file);
        const outPath = path.join(OUT_DIR, file);
        const before = fs.statSync(inPath).size;
        totalBefore += before;

        const outputBuffer = await sharp(inPath)
            .resize({ width: MAX_WIDTH, withoutEnlargement: true })
            .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
            .toBuffer();

        const after = outputBuffer.length;

        if (after < before) {
            totalAfter += after;
            fs.writeFileSync(outPath, outputBuffer);
            console.log(`  ${file}: ${(before / 1024 / 1024).toFixed(2)} MB → ${(after / 1024 / 1024).toFixed(2)} MB  (-${Math.round((1 - after / before) * 100)}%)`);
        } else {
            totalAfter += before;
            // Copy original unchanged
            fs.copyFileSync(inPath, outPath);
            console.log(`  ${file}: already optimised, copied as-is`);
        }
    }

    const totalBeforeMB = (totalBefore / 1024 / 1024).toFixed(1);
    const totalAfterMB = (totalAfter / 1024 / 1024).toFixed(1);
    console.log(`\nTotal: ${totalBeforeMB} MB → ${totalAfterMB} MB  (-${Math.round((1 - totalAfter / totalBefore) * 100)}%)`);
    console.log(`\nRun this to replace originals:\n  Copy-Item gallery-compressed\\* gallery\\ -Force\nfrom src/assets/ folder`);
}

compressImages().catch(console.error);
