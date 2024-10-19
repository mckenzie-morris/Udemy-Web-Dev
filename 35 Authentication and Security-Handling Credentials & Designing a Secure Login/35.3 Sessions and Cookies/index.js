import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import bcrypt from 'bcrypt';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy } from 'passport-local';
dotenv.config();

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(
  session({
    /* a required string used to sign the session ID cookie, which helps ensure the 
  integrity of the session. It prevents tampering with the cookie by malicious users. 
  It can also be an array of secrets, where older secrets are used to verify and new 
  ones to sign. The secret itself should be not easily parsed by a human and would 
  best be a random set of characters. A best practice may include:
  -The use of environment variables to store the secret, ensuring the secret itself 
   does not exist in your repository.
  -Periodic updates of the secret, while ensuring the previous secret is in the array. */
    secret: process.env.SECRET,
    /* controls whether the session is saved back to the session store even if it 
  wasn't modified during the request. In most cases, it's better to set it to false 
  unless the session store specifically requires it. */
    resave: false,
    /* controls whether an uninitialized session (a session that hasn't been modified) 
  is saved to the store. It’s typically better to set it to false to avoid creating 
  sessions for unauthenticated users unless the app needs this behavior. */
    saveUninitialized: true,
    cookie: {
      // 1000ms * 60 seconds * 60 minutes * 24 hours = 1 day
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

/* NOTE: passport.initialize() [followed by passport.session()] MUST come AFTER 
sessions initialization (block above) */
app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
});
db.connect();

app.get('/', (req, res) => {
  res.render('home.ejs');
});

app.get('/login', (req, res) => {
  res.render('login.ejs');
});

app.get('/register', (req, res) => {
  res.render('register.ejs');
});

app.get('/secrets', (req, res) => {
  // comes from 'passport' (is saved into request)
  console.log(req.user)
  if (req.isAuthenticated()) {
    res.render('secrets.ejs');
  } else {
    res.redirect('/login');
  }
});

// triggers 'Strategy' below
app.post('/login', passport.authenticate('local', {
  successRedirect: '/secrets',
  failureRedirect: '/login',
}));

app.post('/register', async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send('Email already exists. Try logging in.');
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error('Error hashing password:', err);
        } else {
          console.log('Hashed Password:', hash);
          const result = await db.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
            [email, hash]
          );
          const user = result.rows[0]
          req.login(user, (err) => {
            console.log(err)
            res.redirect('/secrets')
          })
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post('/login', async (req, res) => {
  const email = req.body.username;
  const loginPassword = req.body.password;
});

passport.use(
  new Strategy(async function verify(username, password, cb) {
    console.log(username);
    /* instead of using bodyParser to pull username and password from the submitted login form,
 passport, thru the verify function, will automatically pull the username and password from
 the form (instead of using req.body.username/req.body.password), so long as the parameters
 exactly match the name attributes on the form */
    try {
      const result = await db.query('SELECT * FROM users WHERE email = $1', [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, result) => {
          if (err) {
            return cb(err);
          } else {
            if (result) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          }
        });
      } else {
        return cb('User not found');
      }
    } catch (err) {
      return cb(err);
    }
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
