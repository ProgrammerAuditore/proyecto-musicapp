require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const _conexion = require('./database');
const path = require('path');
const app  = express();

app.set('port', process.env.APP_PORT || 3000);

// * Database
_conexion();

// * Middleware
app.use(express.static(path.join(__dirname, "public")));

app.use(morgan('dev'));

// * Routes

// * Aplicación
app.listen(app.get('port'), 
() => console.log('Server on ', app.get('port')));

