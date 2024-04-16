import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('GET request successful');
});

app.listen(port, () => {
  console.log(`Server listening on port ${3000}.`);
});
