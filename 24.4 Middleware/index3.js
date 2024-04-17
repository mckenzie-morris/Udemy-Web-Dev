import express from 'express';
const app = express();
const port = 3000;

const logger = (req, res, next) => {
  // req.method is a native Express property and thus does not need the body-parser npm package
  console.log(`request method: ${req.method}`);
  // req.url is not a native Express property, but is inherited from Node.js
  console.log(`request url: ${req.url}`);
  next();
};

app.use(logger);

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
