const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const signupController = require('./src/controllers/signupController');
const placeController = require('./src/controllers/placeController');

const { loginRequired } = require('./src/middlewares/middleware')

// Rotas da home
route.get('/', loginRequired, homeController.index);

// Rotas de login
route.get('/login', loginController.index);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

// Rotas de sign up
route.get('/signup', signupController.index);
route.post('/signup/register', signupController.register);

// Rotas de contato
route.get('/place', loginRequired, placeController.index);
route.post('/place/register', loginRequired, placeController.register);
route.get('/place/:id', loginRequired, placeController.editIndex);
route.post('/place/edit/:id', loginRequired, placeController.edit);
route.get('/place/delete/:id', loginRequired, placeController.delete);

module.exports = route;
