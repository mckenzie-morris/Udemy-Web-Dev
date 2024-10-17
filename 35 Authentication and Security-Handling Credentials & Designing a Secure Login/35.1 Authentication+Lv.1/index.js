import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Client } = pg;

const app = express();
const port = 3000;

const createClientInstance = () => {
  const client = new Client({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
  });
  return client;
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', async (req, res) => {
  const client = createClientInstance();

  await client.connect();

  const result = await client.query('SELECT * FROM public.users');
  console.log(result.rows);

  await client.end();
  res.render('home.ejs');
});

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.get('/register', (req, res) => {
  res.render('register.ejs');
});

app.post('/register', async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  const client = createClientInstance();

  await client.connect();

  const query = {
    text: 'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
    values: [email, password],
  };

  try {
    const result = await client.query(query);
    console.log(result.rows);

    await client.end();

    return res.status(200).render('secrets.ejs');
  } catch (error) {
    res.status(400)
      .send(`<p> An error occurred. ${error}. You will be redirected to the homepage in 5 seconds... </p>
      <script> setTimeout(function() {
        window.location.href = '/';
      }, 5000);
      </script>`);
  }
});

app.post('/login', async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  const client = createClientInstance();

  await client.connect();

  const query = {
    text: 'SELECT * FROM users WHERE email = $1 AND password = $2',
    values: [email, password],
  };

  const result = await client.query(query);
  await client.end();
  console.log(result.rows);
  if (!result.rows.length) {
    res.status(401).send(`
        <p>Bad username and/or password. You will be redirected to the homepage in 5 seconds...</p>
        <script>
          setTimeout(function() {
            window.location.href = '/';
          }, 5000);
        </script>
      `);
  } else return res.status(200).render('secrets.ejs');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
