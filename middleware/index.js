const checkAuth = (req, res, next) => {
  // `user.id` is a number but `params.id` is a string
  if (req.session.user.id == req.params.id) {
    next();
  } else {
    res.redirect('/login');
  }
};

module.exports = checkAuth;