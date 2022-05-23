require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const _conexion = require('./database');
const indexRouter = require('./routes/index.routes');
const cancionRouter = require('./routes/cancion.routes');
const exphbs = require("express-handlebars");
const path = require('path');
const app  = express();

app.set('port', process.env.APP_PORT || 3000);

app.set('views', path.join(__dirname, "views"));

// * Motor de plantillas
app.engine(".hbs", exphbs.engine({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: '.hbs'
}));

app.set("view engine", ".hbs");


// * Database
_conexion();

// * Middleware
app.use(express.static(path.join(__dirname, "public")));

app.use(morgan('dev'));

// * Routes
app.use(indexRouter);
app.use(cancionRouter);

// * Aplicación
app.listen(app.get('port'), 
() => console.log('Server on ', app.get('port')));
