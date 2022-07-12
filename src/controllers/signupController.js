const Signup = require('../models/UserModel')

exports.index = (req, res) => {
  res.render('signup');
}

exports.register = async (req, res) => {
  try {
    const signup = new Signup(req.body);
    await signup.register();

    if (signup.errors.length > 0) {
      req.flash('errors', signup.errors);
      req.session.save(function () {
        return res.redirect('/signup');
      });
      return;
    }

    req.flash('success', 'Seu usuário foi criado com sucesso.');
      req.session.save(function () {
        return res.redirect('/login');
      });
  } catch (e) {
    console.log(e)
    res.render('404')
  }
}