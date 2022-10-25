import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { join } from 'path';
import session from 'express-session';
import compression from 'compression';
import morgan from 'morgan';

import home from './routes/home/home.js';
import login from './routes/api/login.js';
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

app.set('view engine', 'pug');
app.use(morgan(':method - :url - :date - :response-time ms'));
app.listen(3000, () => console.log('Booklist server is running on port 3000'));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'views', 'home.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(join(__dirname, 'views', 'login.html'));
});
