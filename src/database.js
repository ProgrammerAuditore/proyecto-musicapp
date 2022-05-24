const mongoose = require('mongoose');

function _conexion(){
    const conn = mongoose.connection;
    const user = process.env.APP_DB_USER;
    const password = process.env.APP_DB_PASSWORD;
    const database = process.env.APP_DB_DATABASE;
    let URI = process.env.APP_DB_URI;
    
    if(!URI)
    URI = `mongodb+srv://${user}:${password}@redesplus.guu0o.mongodb.net/${database}?retryWrites=true&w=majority`;

    conn.on('connected', (db) =>{
        console.log("conectado a : ", "host:",conn.host, "database:", conn.db.databaseName);
    });

    conn.on('disconnected', (db) =>{
        console.log("desconectado de : ", "host:",conn.host, "database:", conn.db.databaseName);
    });

    conn.on("error", (err) => {
        console.log('error de database', err);
    });

    mongoose.connect(URI);
};

module.exports = _conexion;