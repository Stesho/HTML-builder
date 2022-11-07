const path = require('path');
const fsp = require('fs/promises');
const fs = require('fs');
const { stdout } = require('process');

function writeFile(fileName, folderSrc, ws) {
  if (path.extname(fileName).slice(1) === 'css') {
    const fileSrc = path.join(folderSrc, fileName);
    const rs = fs.createReadStream(fileSrc);

    rs.on('data', (chunk) => {
      ws.write(`${chunk}\n`);
    });
  }
}

async function bundle() {
  try {
    const folderSrc = path.join(__dirname, 'styles');
    const destFilePath = path.join(__dirname, 'project-dist', 'bundle.css');
    const ws = fs.createWriteStream(destFilePath, { flags: 'w' });
    const filesList = await fsp.readdir(folderSrc, { withFileTypes: true });

    filesList.forEach((file) => {
      writeFile(file.name, folderSrc, ws);
    });
  } catch (error) {
    stdout.write(error.message);
  }
};

bundle();