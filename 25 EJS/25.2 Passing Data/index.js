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
      // must return. Otherwise if next function is executed, another response will be sent (throwing an error)
      return;
    }
  }
  next();
});

app.get('/', (req, res) => {
  const defaultHeader = 'Input your name below 👇';
  // second argument of res.render must always be an object
  res.render('index.ejs', { header: defaultHeader });
});

app.post('/submit', (req, res) => {
  const postData = {
    // header must be included, otherwise error will occur from header being undefined in index.ejs
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
