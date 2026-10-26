const sharp = require('sharp');
const path = require('path');

async function transparentizeLogo() {
  const filePath = path.join(__dirname, '../public/brand/harsun-logo-hero.png');
  const outPath = path.join(__dirname, '../public/brand/harsun-logo-transparent.png');

  const { data, info } = await sharp(filePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Sample corner background color (top-left pixel)
  const bgR = data[0];
  const bgG = data[1];
  const bgB = data[2];

  console.log(`Background sample: R=${bgR}, G=${bgG}, B=${bgB}`);

  // Process all pixels: calculate color distance to background
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Distance in RGB space to background
    const dist = Math.sqrt(
      Math.pow(r - bgR, 2) +
      Math.pow(g - bgG, 2) +
      Math.pow(b - bgB, 2)
    );

    // If pixel is very close to beige background, make it transparent
    if (dist < 18) {
      data[i + 3] = 0;
    } else if (dist < 38) {
      // Smooth alpha feathering
      const alpha = (dist - 18) / 20;
      data[i + 3] = Math.round(alpha * 255);
    }
  }

  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .png()
    .toFile(outPath);

  // Also replace harsun-logo-hero.png with transparent version
  await sharp(outPath).toFile(filePath);

  console.log('Logo background successfully made transparent with smooth anti-aliased edge!');
}

transparentizeLogo().catch(console.error);
