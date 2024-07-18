import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import pg from 'pg';

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

db.connect().catch((err) => {
  console.error('Error connecting to database', err);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let items = [
  { id: 1, title: 'Buy milk' },
  { id: 2, title: 'Finish homework' },
];

const getAllItems = async () => {
  try {
    const query = {
      text: 'SELECT * FROM items',
    };
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching items', error);
    return [];
  }
};

app.get('/', async (req, res) => {
  const items = await getAllItems();
  console.log(items);
  res.render('index.ejs', {
    listTitle: 'Today',
    listItems: items,
  });
});

app.post('/add', async (req, res) => {
  try {
    const query = {
      text: 'INSERT INTO items (title) VALUES($1) RETURNING *',
      values: [req.body.newItem],
    };
    const result = await db.query(query);
  } catch (error) {
    console.log(error);
  } finally {
    res.redirect('/');
  }
});

app.post('/edit', async (req, res) => {
  try {
    const query = {
      text: 'UPDATE items SET title = $1 WHERE id = $2 RETURNING *',
      values: [req.body.updatedItemTitle, req.body.updatedItemId],
    };
    const result = await db.query(query);
  } catch (error) {
    console.error(error);
  } finally {
    res.redirect('/');
  }
});

app.post('/delete', async (req, res) => {
  try {
    const query = {
      text: 'DELETE FROM items WHERE id = $1 RETURNING *;',
      values: [req.body.deleteItemId],
    };
    const result = await db.query(query);
  } catch (error) {
    console.error(error);
  } finally {
    res.redirect('/');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
