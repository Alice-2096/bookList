export default (req, res) => {
  //delete user session data when he logs out
  delete req.session.user;
  res.redirect('/login');
};
