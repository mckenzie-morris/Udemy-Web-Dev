//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();

/* 
express now has a 'urlencoded' method 
could use:

 app.use(express.urlencoded({ extended: true }));
 
 instead of the code below
*/

app.use(bodyParser.urlencoded({ extended: true }));
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/check', (req, res) => {
  if (req.body.password === 'ILoveProgramming') {
    return res.sendFile(__dirname + '/public/secret.html');
  }
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
});
