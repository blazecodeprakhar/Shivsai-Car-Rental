import sharp from 'sharp';
import fs from 'fs';

async function makeFavicons() {
  const size = 256;
  const radius = 52; // rounded square / squircle
  
  const maskSvg = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="white"/></svg>`
  );

  // Generate 256x256 rounded square PNG
  await sharp('public/main-logo.jpeg')
    .resize(size, size, { fit: 'cover' })
    .composite([{ input: maskSvg, blend: 'dest-in' }])
    .png()
    .toFile('public/favicon.png');

  // Also generate 64x64 favicon for standard browser tabs
  await sharp('public/favicon.png')
    .resize(64, 64)
    .png()
    .toFile('public/favicon-64.png');

  // Also create apple-touch-icon.png
  await sharp('public/favicon.png')
    .resize(180, 180)
    .png()
    .toFile('public/apple-touch-icon.png');

  // Also convert to base64 embedded in favicon.svg so existing SVG link works automatically too
  const pngBase64 = fs.readFileSync('public/favicon.png').toString('base64');
  const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <image width="${size}" height="${size}" href="data:image/png;base64,${pngBase64}"/>
</svg>`;
  fs.writeFileSync('public/favicon.svg', svgFavicon, 'utf-8');

  console.log('All rounded square favicons successfully generated!');
}

makeFavicons().catch(err => {
  console.error(err);
  process.exit(1);
});
