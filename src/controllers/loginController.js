const Login = require('../models/UserModel.js')

exports.index = (req, res) => {
  res.render('login');
  return;
}

exports.login = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.login();

    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(function () {
        return res.redirect('/login');
      });
      return;
    }

    req.flash('success', 'Bem vindo!');
    req.session.user = login.user;
      req.session.save(function () {
        return res.redirect('/');
      });
  } catch (e) {
    console.log(e)
    res.render('404')
  }
}

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/login')
}