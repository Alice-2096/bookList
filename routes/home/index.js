import { Router } from 'express';
import home from './home.js';
import protectRoute from '../../utils/protectRoute.js';
import login from './login.js';
import signup from './signup.js';
import logout from './logout.js';

const router = Router();

//check if the user has already logged in
router.get('/', (req, res) =>
  req.session.user ? res.redirect('/home') : res.redirect('/login')
);

//user dashboard
router.get('/home', protectRoute(), home);

//logIn
router
  .route('/login')
  .get((req, res) => {
    res.sendFile('/Users/apple/Documents/bookList/views/login.html');
  })
  .post(login);

//signUp
router
  .route('/signup')
  .get((req, res) => {
    res.sendFile('/Users/apple/Documents/bookList/views/register.html');
  })
  .post(signup);

//logOut
router.get('/logout', logout);

export default router;
