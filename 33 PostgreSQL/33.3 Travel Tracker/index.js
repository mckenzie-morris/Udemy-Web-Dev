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

db.connect();

let countries = [];

const getCountries = async () => {
  const query = {
    text: 'SELECT country_code FROM visited_countries',
    rowMode: 'array',
  };
  const result = await db.query(query);
  console.log(result.rows.flat());
  countries = result.rows.flat();
  return countries;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', async (req, res) => {
  const countries = await getCountries();
  res.render('index.ejs', { countries: countries, total: countries.length });
});

app.post('/add', async (req, res) => {
  let inputCountry = req.body.country.trim().split(/\s+/)
  inputCountry = inputCountry.map( (cVal) => {
    return cVal.slice(0, 1).toUpperCase() + cVal.slice(1).toLowerCase();
  })
  inputCountry = inputCountry.join(' ')
  console.log(inputCountry)
  const query = {
    text: 'SELECT country_code FROM countries WHERE country_name = $1',
    values: [inputCountry],
  };

  try {
    const result = await db.query(query);
    if (!result.rows[0]) {
      throw new Error('Country does not exist, try again');
    }
    if (countries.includes(result.rows[0].country_code)) {
      throw new Error('Country has already been added, try again');
    }
    const nextQuery = {
      text: 'INSERT INTO visited_countries(country_code) VALUES($1)',
      values: [result.rows[0].country_code],
    };
    const nextResult = await db.query(nextQuery);
    res.redirect('/');
  } 
  catch (error) {
    console.log(error);
    const countries = await getCountries();
    res.render('index.ejs', {
      countries: countries,
      total: countries.length,
      error: error,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
