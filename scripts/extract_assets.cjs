const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const sourceImg = path.join(__dirname, '../brand_raw/HarSun Chocolates Brand Identity Board.png');
const outDir = path.join(__dirname, '../public/brand');

async function extract() {
  console.log('Extracting assets from brand board...');
  
  // 1. Copy the full original board
  fs.copyFileSync(sourceImg, path.join(outDir, 'harsun-brand-board.png'));
  fs.copyFileSync(path.join(__dirname, '../brand_raw/Sunita Harish Chocolate Logo Collection.png'), path.join(outDir, 'harsun-logo-collection.png'));

  // 2. Main top hero logo (width 1254, height ~550)
  // Let's crop centered logo
  await sharp(sourceImg)
    .extract({ left: 150, top: 40, width: 954, height: 470 })
    .toFile(path.join(outDir, 'harsun-logo-hero.png'));

  // Tight crop of logo symbol + HarSun text
  await sharp(sourceImg)
    .extract({ left: 240, top: 40, width: 774, height: 410 })
    .toFile(path.join(outDir, 'harsun-logo-main.png'));

  // 3. Dark logo (bottom-left of middle section: x: 0 to 530, y: 550 to 835)
  await sharp(sourceImg)
    .extract({ left: 30, top: 560, width: 470, height: 260 })
    .toFile(path.join(outDir, 'harsun-logo-dark.png'));

  // 4. Icons bar (x: 535 to 1240, y: 560 to 835)
  await sharp(sourceImg)
    .extract({ left: 540, top: 560, width: 700, height: 260 })
    .toFile(path.join(outDir, 'harsun-pillars-badges.png'));

  // 5. Truffles box (bottom left: x: 0 to 415, y: 835 to 1254)
  await sharp(sourceImg)
    .extract({ left: 0, top: 835, width: 415, height: 419 })
    .toFile(path.join(outDir, 'product-truffle-box.png'));

  // 6. Pink gift box with ribbon (bottom center: x: 415 to 815, y: 835 to 1254)
  await sharp(sourceImg)
    .extract({ left: 418, top: 835, width: 398, height: 419 })
    .toFile(path.join(outDir, 'product-gift-box.png'));

  // 7. Chocolate bars lineup (bottom right: x: 818 to 1254, y: 835 to 1254)
  await sharp(sourceImg)
    .extract({ left: 818, top: 835, width: 436, height: 419 })
    .toFile(path.join(outDir, 'product-bars-collection.png'));

  // 8. Individual bars from the lineup
  // Milk chocolate (pink wrapper)
  await sharp(sourceImg)
    .extract({ left: 818, top: 835, width: 140, height: 419 })
    .toFile(path.join(outDir, 'product-bar-milk.png'));

  // Dark chocolate (dark brown 70% wrapper)
  await sharp(sourceImg)
    .extract({ left: 935, top: 835, width: 175, height: 419 })
    .toFile(path.join(outDir, 'product-bar-dark.png'));

  // Almond chocolate (cream wrapper)
  await sharp(sourceImg)
    .extract({ left: 1095, top: 835, width: 155, height: 419 })
    .toFile(path.join(outDir, 'product-bar-almond.png'));

  console.log('All brand assets extracted successfully!');
}

extract().catch(console.error);
