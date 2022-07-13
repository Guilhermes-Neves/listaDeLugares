const Place = require('../models/PlaceModel');

exports.index = async (req, res) => {
  const lugares = await Place.searchPlaces();
  res.render('index', { lugares });
  return;
};


