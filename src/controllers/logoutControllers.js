const logoutUser = (req, res) => {
  try {
    if (req.session.newUser) {
      req.session.destroy(() => {
        res.clearCookie('userCookie');
        res.redirect('/');
      });
    } else {
      res.redirect('/register');
    }
  } catch (error) {
    res.send(`Error ------> ${error}`);
  }
};

module.exports = { logoutUser };
