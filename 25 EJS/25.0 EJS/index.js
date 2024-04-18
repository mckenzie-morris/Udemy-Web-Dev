import express from 'express';
import ejs from 'ejs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const newDay = new Date();
const dayOfTheWeek = newDay.getDay();
const daysArray = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send(`${daysArray[dayOfTheWeek]}`);
});

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
});
