const mongoose = require('mongoose');

function _conexion(){
    const conn = mongoose.connection;
    const user = process.env.APP_DB_USER;
    const password = process.env.APP_DB_PASSWORD;
    const URI = `mongodb+srv://${user}:${password}@redesplus.guu0o.mongodb.net/?retryWrites=true&w=majority`;

    conn.on('connected', (db) =>{
        console.log("conectado a : ", conn.host);
    });

    conn.on('disconnected', (db) =>{
        console.log("desconectado de : ", conn.host);
    });

    conn.on("error", (err) => {
        console.log('error de database', err);
    });

    mongoose.connect(URI);
};

module.exports = _conexion;