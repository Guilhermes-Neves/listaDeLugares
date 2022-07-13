import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/Login';
import Signup from './modules/Signup';
import Place from './modules/Place';

const login = new Login('.login-form');
const signup = new Signup('.signup-form');
const place = new Contact('.place-form');

login.init();
signup.init();
place.init();