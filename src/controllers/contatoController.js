const Contato = require('../models/ContatoModel')

exports.index = (req, res) => {
  res.render('contato', {
    contato: {}
  });
  return;
};

exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body);
    await contato.register();

    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      req.session.save(function () {
        return res.redirect('/contato');
      });
      return;
    }

    req.flash('success', 'Seu contato foi cadastrado com sucesso.');
    req.session.save(function () {
      return res.redirect(`/`);
    });
  } catch (e) {
    console.log(e)
    res.render('404')
  }
};

exports.editIndex = async function (req, res) {
  try {
    if (!req.params.id) return res.render('404');

    const contato = await Contato.buscaPorId(req.params.id);
    if (!contato) return res.render('404');

    res.render('contato', { contato });
  } catch(e) {
    console.log(e);
  }
};

exports.edit = async (req, res) => {
  try {
    if (!req.params.id) return res.render('404');
    const contato = new Contato(req.body);
    await contato.edit(req.params.id);

    if (contato.errors.length > 0) {
      req.flash('errors', contato.errors);
      req.session.save(function () {
        return res.redirect(`/contato/${req.params.id}`);
      });
      return;
    }

    req.flash('success', 'Seu contato foi editado com sucesso.');
    req.session.save(function () {
      return res.redirect(`/`);
    });
  } catch (e) {
    console.log(e);
  }
};

exports.delete = async (req, res) => {
  try {
    if (!req.params.id) return res.render('404');
    
    const contato = await Contato.delete(req.params.id);
    
    if (!contato) return res.render('404');

    req.flash('success', 'Seu contato foi excluído com sucesso.');
    req.session.save(function () {
      return res.redirect(`/`);
    });
  } catch (e) {
    console.log(e);
  }
};