const path = require('path');
const { stdin, stdout, exit } = process;
const { createWriteStream } = require('fs');
const output = createWriteStream(path.join(__dirname, 'text.txt'), 'utf-8');

stdin.on('data', data => {
  if (data.toString().trim() === 'exit') {
    exit();
  }
  output.write(data);
});

stdout.write('Enter some text\n');

process.on('exit', () => {
  stdout.write('Goodbye!\n');
});

process.on('SIGINT', () => {
  exit();
});