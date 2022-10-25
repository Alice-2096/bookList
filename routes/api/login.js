export default (req, res) => {
  let { email, password } = req.body;
  res.json({ status: true });
};
