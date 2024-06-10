const sharp = require('sharp');
const svg2img = require('svg2img');
const fs = require('fs');

const dir = process.cwd() + '/dist/icongen';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

// Convert JPG to PNG
sharp(process.cwd() + '/public/wallpaper.jpg')
  .png()
  .toFile(process.cwd() + '/dist/icongen/wallpaper.png', (err, info) => {
    if (err) {
      console.error('Error converting JPG to PNG:', err);
    } else {
      console.log('Successfully converted JPG to PNG:', info);
    }
  });

// Convert SVG to PNG
svg2img(process.cwd() + '/resources/icon.svg', function(error, buffer) {
  if (error) {
    console.error('Error converting SVG to PNG:', error);
  } else {
    sharp(buffer)
      .png()
      .toFile(process.cwd() + '/dist/icongen/icon.png', (err, info) => {
        if (err) {
          console.error('Error saving PNG file:', err);
        } else {
          console.log('Successfully converted SVG to PNG:', info);
        }
      });
  }
});
