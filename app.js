import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { join } from 'path';
import session from 'express-session';
import compression from 'compression';
import morgan from 'morgan';
import moment from 'moment';
import home from './routes/home/home.js';
import login_page from './routes/home/login_page.js';
import { get } from 'http';
import protectRoute from './utils/protectRoute.js';
import connectToDb from './db/index.js';
import { signUp } from './controllers/user.js';
import { logIn } from './controllers/user.js';

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
      maxAge: 18000000, //duration of cookie
      secure: app.get('env') === 'production' ? true : false, //true -- cookie can be read during secure HTTP connection
    },
  })
);

//GET
app.get('/', (req, res) =>
  req.session.user ? res.redirect('/home') : res.redirect('/login')
);

app.get('/home', protectRoute(), (req, res) => {
  res.render('home', {
    user: req.session.user.name,
    lastLoggedIn: moment(req.session.user.lastLoggedIn).format(
      'MMMM, Do YYYY, h:mm:ss a'
    ),
    email: req.session.user.email,
    booklist: [
      {
        id: 1,
        title: 'The Ethics of Technology',
        desc: 'First --- Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero repudiandae corrupti id aperiam rem molestiae quasi numquam. Doloremque sequi exercitationem, est facere temporibus labore nesciunt aspernatur similique voluptates earum odit.',
      },
      {
        id: 2,
        title: "Heidegger's Being and Time",
        desc: 'Second --- Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero repudiandae corrupti id aperiam rem molestiae quasi numquam. Doloremque sequi exercitationem, est facere temporibus labore nesciunt aspernatur similique voluptates earum odit.',
      },
    ],
    finishedBooklist: [
      {
        id: 1,
        title: 'The Second Sex',
        desc: 'Third --- Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero repudiandae corrupti id aperiam rem molestiae quasi numquam. Doloremque sequi exercitationem, est facere temporibus labore nesciunt aspernatur similique voluptates earum odit.',
      },
    ],
  });
  // ! update when setting up database
  // res.sendFile(join(__dirname, 'views', 'home.html')); -- for rending static files
});

app
  .route('/login')
  .get((req, res) => {
    res.sendFile(join(__dirname, 'views', 'login.html'));
  })
  .post(async (req, res) => {
    try {
      const { name, password } = req.body;
      const user = await logIn({ name, password }); //function param names need to match!
      req.session.user = {
        id: user._id,
        name: user.name,
        email: user.email,
        lastLoggedIn: user.lastLoggedIn,
      };
      return res.redirect('/home');
    } catch (error) {
      console.log(error);
      res.redirect('/login');
    }
  });

app.get('/home/logout', (req, res) => {
  //delete user session data when he logs out
  delete req.session.user;
  res.redirect('/login');
});

app
  .route('/signup')
  .get((req, res) => {
    res.sendFile(join(__dirname, 'views', 'register.html'));
  })
  .post(async (req, res) => {
    try {
      const { name, email, password } = req.body;
      await signUp({ name, email, password });
      return res.redirect('/login');
    } catch (error) {
      console.log(error);
      res.redirect('/signup');
    }
  });
