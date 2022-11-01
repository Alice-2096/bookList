import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { join } from 'path';
import session from 'express-session';
import compression from 'compression';
import morgan from 'morgan';
import connectToDb from './db/index.js';
//route handlers
import home from './routes/home/index.js';
import bookAPI from './routes/api/index.js';

const app = express(); //give us access to express methods
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// utility functions
app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/public', express.static(join(__dirname, 'public')));
app.use(morgan(':method - :url - :date - :response-time ms'));
app.set('view engine', 'pug');

// connect to resources -- i.e, database -- before the Express server goes online -- use promise.all to connect to ALL resources
Promise.all([connectToDb()])
  .then(() =>
    app.listen(3000, () =>
      console.log('Booklist server is running on port 3000')
    )
  )
  .catch((error) => {
    console.error(`mongoDB atlas error: ${error}`);
    process.exit();
  });

//Session
app.use(
  '/',
  session({
    name: 'sessId', //cookie name to be set in the user's browser
    resave: false, //mandatory setting -- save to session store even if it has not been changed
    saveUninitialized: true, //store uninitialized session into the store
    secret: process.env.sessionSecret,

    // app.get('env') === 'production'
    //   ? process.env.sessionSecrete //in the production setting, we manually set an environment variable
    //   : '2bb3jldsioh4dhshkds',
    //secrete is used to encrypt the session cookie so that you can be reasonably sure the cookie isn't a fake one
    cookie: {
      httpOnly: true,
      maxAge: 18000000000, //duration of cookie
      secure: app.get('env') === 'production' ? true : false, //true -- cookie can be read during secure HTTP connection
    },
  })
);

//Mounting route handlers
app.use('/', home);
app.use('/home/api/books', bookAPI);
