import 'core-js/stable';
import 'regenerator-runtime/runtime';

//import './assets/styles/style.css'

import { ValidaLogin } from './modules/ValidaLogin'
import { ValidaFormContato } from './modules/ValidaFormContato';

const login = new ValidaLogin('.form-login')
const register = new ValidaLogin('.form-register')
login.init()
register.init()

const formContato = new ValidaFormContato('.form-contato')
formContato.init()