import { signUp } from '../../controllers/user.js';

export default async (req, res) => {
  try {
    const { name, email, password } = req.body;
    signUp({ name, email, password });
    return res.redirect('/login');
  } catch (error) {
    console.log(error);
    res.redirect('/signup');
  }
};
