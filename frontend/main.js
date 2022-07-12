import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/Login';
import Signup from './modules/Signup';
import Contact from './modules/Contact';

const login = new Login('.login-form');
const signup = new Signup('.signup-form');
const contact = new Contact('.contact-form');

login.init();
signup.init();
contact.init();