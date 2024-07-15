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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let currentUserId = 1;

let users = [
  { id: 1, name: 'Angela', color: 'teal' },
  { id: 2, name: 'Jack', color: 'powderblue' },
];

async function checkVisisted() {
  const result = await db.query(
    'SELECT country_code FROM visited_countries JOIN users ON users.id=user_id WHERE user_id = $1;',
    [currentUserId]
  );
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

async function getCurrentUser() {
  const result = await db.query('SELECT * FROM users');
  users = result.rows;
  return users.find((user) => user.id == currentUserId);
}

app.get('/', async (req, res) => {
  const countries = await checkVisisted();
  const currentUser = await getCurrentUser();
  res.render('index.ejs', {
    countries: countries,
    total: countries.length,
    users: users,
    color: currentUser.color,
  });
});
app.post('/add', async (req, res) => {
  const input = req.body['country'];
  const currentUser = await getCurrentUser();

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        'INSERT INTO visited_countries (country_code, user_id) VALUES ($1, $2)',
        [countryCode, currentUserId]
      );
      res.redirect('/');
    } catch (err) {
      console.log(err);
      const countries = await checkVisisted();
      res.render('index.ejs', {
        countries: countries,
        total: countries.length,
        color: currentUser.color,
        error: 'Country has already been added, try again.',
      });
    }
  } catch (err) {
    console.log(err);
    const countries = await checkVisisted();
    res.render('index.ejs', {
      countries: countries,
      total: countries.length,
      color: currentUser.color,
      error: 'Country name does not exist, try again.',
    });
  }
});
app.post('/user', async (req, res) => {
  if (req.body.add) {
    return res.render('new.ejs');
  }
  console.log(req.body.user);
  currentUserId = req.body.user;
  res.redirect('/');
});

app.post('/new', async (req, res) => {
  const name = req.body.name;
  const color = req.body.color;
  const result = await db.query(
    'INSERT INTO users (name, color) VALUES($1, $2) RETURNING *;',
    [name, color]
  );
  const id = result.rows[0].id;
  currentUserId = id;

  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
