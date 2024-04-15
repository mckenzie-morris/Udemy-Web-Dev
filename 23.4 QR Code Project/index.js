/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import qr from 'qr-image';
import { createWriteStream, writeFile } from 'fs';

const questions = [
  {
    type: 'input',
    name: 'url',
    message: 'Please enter the URL you wish to convert to a QR code image:',
    validate(value) {
      const pass = value.match(
        /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i
      );
      if (pass) {
        return true;
      }
      return 'Please enter a valid URL';
    },
  },
];

inquirer.prompt(questions).then((answers) => {
  writeFile('myGeneratedURL.txt', answers.url, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
  const qr_png = qr.image(answers.url, { type: 'png' });
  qr_png.pipe(createWriteStream('myGeneratedQRcode.png'));
});
