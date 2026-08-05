const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const outputDir = path.join(process.cwd(), 'public/logos');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Ensure input image path matches your source collage banner image
const inputImage = path.join(process.cwd(), 'public/trusted-brands-collage.png'); 

// Exact 4x5 grid bounding boxes (adjust offsets to ensure ZERO bleed from adjacent logos)
// Grid: 4 Rows, 5 Columns
const brands = [
  // Row 1
  { name: 'interwood', col: 0, row: 0 },
  { name: 'surge', col: 1, row: 0 },
  { name: 'oxford', col: 2, row: 0 },
  { name: 'wps', col: 3, row: 0 },
  { name: 'hvacr', col: 4, row: 0 },
  // Row 2
  { name: 'samsons', col: 0, row: 1 },
  { name: 'diners', col: 1, row: 1 },
  { name: 'fruitien', col: 2, row: 1 },
  { name: 'sufi', col: 3, row: 1 },
  { name: 'kips', col: 4, row: 1 },
  // Row 3
  { name: 'ucl', col: 0, row: 2 },
  { name: 'nureh', col: 1, row: 2 },
  { name: 'vanya', col: 2, row: 2 },
  { name: 'one', col: 3, row: 2 },
  { name: 'skans', col: 4, row: 2 },
  // Row 4
  { name: 'studyicon', col: 0, row: 3 },
  { name: 'ahz', col: 1, row: 3 },
  { name: 'union', col: 2, row: 3 },
  { name: 'jks', col: 3, row: 3 },
  { name: 'gofy', col: 4, row: 3 },
];

async function cropLogos() {
  const metadata = await sharp(inputImage).metadata();
  const cellWidth = Math.floor(metadata.width / 5);
  const cellHeight = Math.floor(metadata.height / 4);

  for (const item of brands) {
    // Add internal padding (+10px inset) to prevent edge bleeding
    const left = item.col * cellWidth + 10;
    const top = item.row * cellHeight + 10;
    const width = cellWidth - 20;
    const height = cellHeight - 20;

    await sharp(inputImage)
      .extract({ left, top, width, height })
      .toFile(path.join(outputDir, `${item.name}.png`));
  }
  console.log('Successfully cropped 20 standalone logo PNGs!');
}

cropLogos();
