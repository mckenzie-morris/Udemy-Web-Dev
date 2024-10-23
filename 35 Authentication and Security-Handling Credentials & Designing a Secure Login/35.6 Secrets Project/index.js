import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy } from 'passport-local';
import GoogleStrategy from 'passport-google-oauth2';
import session from 'express-session';
import env from 'dotenv';

const app = express();
const port = 3000;
const saltRounds = 10;
env.config();

///////////////////////🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩///////////////////////

/* 

a session is server-side storage, and the cookie is a client-side mechanism 
to remember the session ID and associate the user's requests with their 
session on the server 

1.) a user starts a session, the server generates a unique session ID and 
stores it in a cookie on the user's browser.

2.) on subsequent requests, the browser sends the cookie (with the session ID) 
back to the server.

3.) the server uses the session ID to find the associated session data stored 
on the server.

*/

///////////////////////🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩🚩///////////////////////

/* initializes session handling in Express. a way to store data (like user 
information) across multiple requests */
app.use(
  session({
    /* the secret key used to sign the session ID cookie, which is stored on 
    the client side. it helps secure the session by preventing tampering */
    secret: process.env.SESSION_SECRET,
    /* prevents the session from being saved back to the store (e.g., memory 
    or database) if it hasn't been modified during the request. 
    
    some reasons to save the session without modification from a request:
    1.) extend the session's expiration time with each request (effectively 
    reset the session's expiration time)
    2.) log session activity for auditing, analytics, or monitoring purposes
    */
    resave: false,
    /* session will be created and saved to the session store even if it hasn't 
    been modified or used yet.

    (i.e.) a user visits your website and just browses without logging in or 
    doing anything that directly modifies the session (like adding an item to 
    a shopping cart or filling out a form)

    is useful for tracking users who are not logged in (anonymous visitors)

     security mechanisms like CSRF (Cross-Site Request Forgery) protection 
     rely on sessions. even if a user is not authenticated, app may still need 
     a session to store CSRF tokens to protect forms */
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// initializes Passport so that it can handle authentication processes
app.use(passport.initialize());
/* allows Passport to work with Express sessions- tells Passport to use 
session cookies to keep track of the user's authentication state across 
different requests.

Express uses the express-session middleware to manage server-side sessions, 
and Passport integrates with this system to handle authentication

Passport uses Express's session handling to store the user's authentication 
status. When a user logs in, Passport serializes the user information into 
the session (turning the user object into an ID), and then on future requests, 
Passport deserializes the user from the session (retrieves the user based on 
the session ID stored in the cookie). */
app.use(passport.session());

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
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

app.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

app.get('/secrets', async (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user);
    //TODO: Update this to pull in the user secret to render in secrets.ejs ✅
    try {
      const result = await db.query(
        'SELECT secret FROM users WHERE email = $1 ',
        [req.user.email]
      );
      const secret = result.rows[0].secret;
      if (secret) {
        res.render('secrets.ejs', { secret: secret });
      } else {
        res.render('secrets.ejs', { secret: 'Submit a secret!' });
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.redirect('/login');
  }
});

//TODO: Add a get route for the submit button ✅
//Think about how the logic should work with authentication. ✅
app.get('/submit', (req, res) => {
  /* passport.session() attaches the isAuthenticated() method to the req object
  
  Passport keeps track of whether a user is logged in or not by storing their 
  authentication status in the session (managed by express-session).

  when a user successfully logs in (via a local strategy, Google OAuth, etc.), 
  Passport serializes their user information (usually the user ID) into the session. 
  this indicates that the user is now authenticated.

  when a user makes a request, Passport deserializes their user information from
  the session. ff a user is logged in (i.e., authenticated), Passport retrieves 
  their user data from the session and attaches it to req.user.

  req.isAuthenticated() checks whether req.user is populated (req.user is a property 
  that Passport adds to the request object after deserialization) */
  if (req.isAuthenticated()) {
    res.render('submit.ejs');
  } else {
    res.redirect('/login');
  }
});

app.get(
  '/auth/google',
  /* tells Passport to use the 'google' OAuth strategy (defined in code-block below) 
  to handle authentication
  
  scope defines the specific pieces of information (permissions) your app is 
  requesting from the user’s Google account

  1.) User clicks on the login button (the /auth/google route is triggered)
  2.) passport.authenticate('google', { scope: [...] }) method sends the user to 
    Google’s login/consent page, where they are asked to grant the requested 
    permissions (based on the scopes)
  3.) after the user grants permission, Google redirects them back to your app with 
    an authorization code
  4.) Using the authorization code, Passport can request the user’s profile and email 
  from Google and authenticate the user in your app */
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

/* handles the callback from Google and completes the authentication process, 
deciding whether the user is successfully authenticated and where to redirect 
them afterward */
app.get(
  '/auth/google/secrets',
  passport.authenticate('google', {
    successRedirect: '/secrets',
    failureRedirect: '/login',
  })
);

/* handles the callback and completes the authentication process, deciding whether 
the user is successfully authenticated and where to redirect them afterward */
app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/secrets',
    failureRedirect: '/login',
  })
);

app.post('/register', async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      req.redirect('/login');
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error('Error hashing password:', err);
        } else {
          const result = await db.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
            [email, hash]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            console.log('success');
            res.redirect('/secrets');
          });
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

//TODO: Create the post route for submit. ✅
//Handle the submitted data and add it to the database ✅
app.post('/submit', async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const result = await db.query(
        'UPDATE users SET secret = $1 WHERE email = $2 RETURNING *',
        [req.body.secret, req.user.email]
      );
      console.log(result.rows[0]);
      res.redirect('/secrets');
    } catch (error) {
      console.log(error);
    }
  } else {
    res.redirect('/login');
  }
});

/* defines how the app authenticates a user using their username/email and password-
specific to the local strategy, where users log in with credentials stored in the local 
database (as opposed to an external service) */
passport.use(
  'local',
  /* the cb parameter (which stands for "callback") is a function provided by 
  Passport that you call to inform it of the result of the authentication attempt */
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await db.query('SELECT * FROM users WHERE email = $1 ', [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          // If something goes wrong during the authentication process
          if (err) {
            console.error('Error comparing passwords:', err);
            return cb(err);
          } else {
            /* If the user is successfully authenticated (i.e., the password matches), 
            call cb(null, user) to indicate that there was no error (hence null for 
            the first argument) and pass the user object as the second argument to 
            signal that authentication was successful
            
            Passport serializes the user object into the session, which means it stores 
            the user’s ID (or some identifier) in the session to keep track of the user 
            across requests.

            In any route handler, once a user is authenticated, req.user will contain the 
            user object that was serialized during login. */
            if (valid) {
              return cb(null, user);
            } else {
              /* if the password doesn’t match, call cb(null, false) to indicate that 
            authentication failed. the false signals that authentication was NOT successful */
              return cb(null, false);
            }
          }
        });
      } else {
        // If no user is found in the database, call cb('User not found') to signal an error
        return cb('User not found');
      }
    } catch (err) {
      console.log(err);
    }
  })
);

passport.use(
  'google',
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/secrets',
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
    },
    /* accessToken: access token is a token that Google issues when a user 
    successfully authenticates with their Google account and grants the app 
    permission to access certain data 
    
      refreshToken: refresh token is a long-lived token that can be used to 
      obtain a new access token when the current one expires

      profile: profile parameter contains the user’s profile information from 
      Google, which includes their email, name, profile picture, and potentially 
      more (depending on the scope of the data requested during login)
    */
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const result = await db.query('SELECT * FROM users WHERE email = $1', [
          profile.email,
        ]);
        if (result.rows.length === 0) {
          const newUser = await db.query(
            'INSERT INTO users (email, password) VALUES ($1, $2)',
            [profile.email, 'google']
          );
          return cb(null, newUser.rows[0]);
        } else {
          return cb(null, result.rows[0]);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);
/* When a user logs in, Passport takes the user object and stores it 
in the session by calling req.session.passport under the hood. It 
typically only stores the user ID to keep the session data lightweight

Express-session manages the session and stores the user’s 
serialized data (e.g., user ID) */
passport.serializeUser((user, cb) => {
  cb(null, user);
});
/* On subsequent requests, Passport retrieves the user ID from the 
session and fetches the full user object (from your database or wherever 
the user is stored) and attaches it to req.user so that the user is 
authenticated for each request without needing to log in again.

req.user is then available in your request handlers, allowing access 
to the authenticated user's information easily */
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
