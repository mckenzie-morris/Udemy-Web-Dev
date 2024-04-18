import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));

const bandNameGenerator = (req, res, next) => {
  req.bandName = req.body.street + req.body.pet;
  next();
};

app.use(bandNameGenerator);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/submit', (req, res) => {
  const bandName = req.bandName;
  res.send(`<h1>Your band name is:</h1><h2>${bandName} 🤘🤘🤘</h2>`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
