export default (req, res) => {
  res.sendFile(join(__dirname, 'views', 'login.html'));
};
