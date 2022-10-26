const protectRoute =
  (redirectTo = '/') =>
  (req, res, next) => {
    if (req.session.user) {
      return next();
      //pass the request to the route handler function
    }
    return res.redirect(redirectTo);
  };

export default protectRoute;
