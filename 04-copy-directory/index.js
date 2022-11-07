const fs = require('fs/promises');
const path = require('path');
const { stdout } = require('process');

const destFolderPath = path.join(__dirname, 'newFiles');
const srcFolderPath = path.join(__dirname, 'files');

async function copyFiles(src, dest) {
  try {
    const filesList = await fs.readdir(src, { withFileTypes: true });

    filesList.forEach((file) => {
      const srcPath = path.join(src, file.name);
      const destPath = path.join(dest, file.name);

      if (file.isFile()) {
        fs.copyFile(srcPath, destPath);
      } else {
        copyFolder(srcPath, destPath);
      }
    });
  } catch (error) {
    stdout.write(error.message);
  }
}

async function copyFolder(src, dest) {
  await fs.rm(dest, { recursive: true, force: true });
  await fs.mkdir(dest, { recursive: true });

  copyFiles(src, dest);
};

copyFolder(srcFolderPath, destFolderPath);
