import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/contact', (req, res) => {
  res.send('<h2>Call me @:</h2><p>1-800-call-now</p>');
});

app.get('/about', (req, res) => {
  res.send(
    '<h2>About me:</h2><p>Full-Stack Software Engineer and former Certified Personal Trainer</p>'
  );
});

app.listen(port, () => {
  console.log(`Server listening on port ${3000}.`);
});
