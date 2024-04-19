import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const getData = { header: 'Input your name below 👇' };
  res.render('index.ejs', getData);
});

app.post('/submit', (req, res) => {
  const postData = { header: 'something' };
  res.render('index.ejs', postData);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
