import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import 'dotenv/config';

const app = express();
const port = 3000;

const DB_USER = process.env.DB_USER;
const DB_HOST = process.env.DB_HOST;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT;

const db = new pg.Client({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT,
});

let countries = [];

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', async (req, res) => {
  db.query('SELECT * FROM visited_countries', (err, res) => {
    if (err) {
      console.error('Error executing query', err.stack);
    } else {
      console.log(res.rows);
      const countryCodesArr = res.rows;
      countryCodesArr.forEach( (elmt) => {
        countries.push(elmt.country_code);
      })
      console.log(countries)
    }
    // db.end();
  });
  res.render('index.ejs', { total: 0, countries: countries });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
