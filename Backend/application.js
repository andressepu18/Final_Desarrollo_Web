'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let routerResenas = require('./routes/resenas');
let routerUsuarios = require('./routes/users');
let cors = require('cors');

let application = express();

application.use(cors());
application.use(bodyParser.json()); // Transforma el body a Json automaticamente
application.use(routerResenas);
application.use(routerUsuarios);


module.exports = application;
