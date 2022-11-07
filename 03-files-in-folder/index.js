const path = require('path');
const { readdir, stat } = require('fs/promises');
const { stdout } = require('process');

const separator = ' - ';
const options = { withFileTypes: true };
const folder = 'secret-folder';
const pathToDirectory = path.join(__dirname, folder);

function convert(bytes, digits = 3) {
  return `${(bytes / 1024).toFixed(digits)}kb`;
}

async function parseFolder(directory, options, outputSeparator) {
  try {
    const files = await readdir(directory, options);
    
    files.filter((file) => file.isFile())
         .forEach((file) => {
           showFileInfo(path.join(directory, file.name), outputSeparator);
         });

  } catch (err) {
    console.log(err.message);
  }
}

async function showFileInfo(fullPath, outputSeparator) {
  try {
    const file = await stat(fullPath);
    const fileInfo = path.basename(fullPath).split('.');
    
    fileInfo.push(convert(file.size));

    stdout.write(`${fileInfo.join(outputSeparator)}\n`);

  } catch (err) {
    console.log(err.message);
  }
}

parseFolder(pathToDirectory, options, separator);