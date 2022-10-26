import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { join } from 'path';
import session from 'express-session';
import compression from 'compression';
import morgan from 'morgan';
import home from './routes/home/home.js';
import login_page from './routes/home/login_page.js';
import { get } from 'http';

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
app.listen(3000, () => console.log('Booklist server is running on port 3000'));

//GET
app.get('/', (req, res) => {
  res.render('home', {
    user: 'Alice Jiang',
    email: 'iamalice123@yahoo.com',
    booksToRead: [
      {},
      {}
    ]
    finishedBooks: [
      {}
    ]

  });
  // ! update when setting up database
  // res.sendFile(join(__dirname, 'views', 'home.html')); -- for rending static files
});

app
  .route('/login')
  .get((req, res) => {
    res.sendFile(join(__dirname, 'views', 'login.html'));
  })
  .post((req, res) => res.redirect('./views/home.html')); //direct to homepage when log in

app.get('/home/logout', (req, res) => res.redirect('/login'));
