const Place = require('../models/PlaceModel')

exports.index = (req, res) => {
  res.render('lugares', {
    place: {}
  });
  return;
};

exports.register = async (req, res) => {
  try {
    const place = new Place(req.body);
    console.log(req.body)
    await place.register();

    if (place.errors.length > 0) {
      req.flash('errors', place.errors);
      req.session.save(function () {
        return res.redirect('/place');
      });
      return;
    }

    req.flash('success', 'Nosso passeio foi cadastrado com sucesso.');
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

    const place = await Place.buscaPorId(req.params.id);
    if (!place) return res.render('404');

    res.render('lugares', { place });
  } catch(e) {
    console.log(e);
  }
};

exports.edit = async (req, res) => {
  try {
    if (!req.params.id) return res.render('404');
    const place = new Place(req.body);
    await place.edit(req.params.id);

    console.log(req.body)

    if (place.errors.length > 0) {
      req.flash('errors', place.errors);
      req.session.save(function () {
        return res.redirect(`/place/${req.params.id}`);
      });
      return;
    }

    req.flash('success', 'Nosso passeio foi editado com sucesso.');
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
    
    const place = await Place.delete(req.params.id);
    
    if (!place) return res.render('404');

    req.flash('success', 'Nosso passeio foi excluído com sucesso.');
    req.session.save(function () {
      return res.redirect(`/`);
    });
  } catch (e) {
    console.log(e);
  }
};