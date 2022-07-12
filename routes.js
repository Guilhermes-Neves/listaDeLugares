const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const signupController = require('./src/controllers/signupController');
const contatoController = require('./src/controllers/contatoController');

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
route.get('/contato', loginRequired, contatoController.index);
route.post('/contato/register', loginRequired, contatoController.register);
route.get('/contato/:id', loginRequired, contatoController.editIndex);
route.post('/contato/edit/:id', loginRequired, contatoController.edit);
route.get('/contato/delete/:id', loginRequired, contatoController.delete);

module.exports = route;
