require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const _conexion = require('./database');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const indexRouter = require('./routes/index.routes');
const cancionRouter = require('./routes/cancion.routes');
const exphbs = require("express-handlebars");
const path = require('path');
const app  = express();

app.set('port', process.env.PORT || process.env.APP_PORT || 3000);

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
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(session({
    secret: '/.phrase.secrent./',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(function(req, res, next){
    res.locals.msgsuccess = req.flash('msgsuccess');
    res.locals.msgwarning = req.flash('msgwarning');
    res.locals.msgdanger = req.flash('msgdanger');
    next();
   });

// * Routes
app.use(indexRouter);
app.use(cancionRouter);

// * Error 404
app.use(function(req, res, next){
    res.status(404).render('404');
});

// * Aplicación
const server = app.listen(app.get('port'), () => {
    const { address, port } = server.address();
    const ip = address === '::' ? 'localhost' : address;
    const protocol = 'http';
    const url = `${protocol}://${ip}:${port}`;

    console.log(`Servidor corriendo en ${url}`);
});

