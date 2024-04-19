import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/submit', (req, res, next) => {
  const regex = /^[a-zA-Z]+$/;
  if (req.body) {
    if (!regex.test(req.body.fName) || !regex.test(req.body.lName)) {
      const data = { badInput: true };
      res.render('index.ejs', data);
      return;
    }
  }
  next();
});

app.get('/', (req, res) => {
  const getData = { header: 'Input your name below 👇' };
  res.render('index.ejs', getData);
});

app.post('/submit', (req, res) => {
  const postData = {
    header: null,
    nextHeader: true,
    firstName: req.body.fName,
    lastName: req.body.lName,
  };
  res.render('index.ejs', postData);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
