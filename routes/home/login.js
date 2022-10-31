import { logIn } from '../../controllers/user.js';

export default async (req, res) => {
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
};
