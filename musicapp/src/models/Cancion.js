const mongoose = require('mongoose');
const { Schema } = mongoose;

const titulo = {type: "String", require: true};
const grupo = {type: "String", require: true};
const anho = {type: "Number", require: false};
const genero = {type: "String", require: false};

const SchemaCancion = new Schema(
    { titulo, grupo, anho, genero }, 
    { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Cancion", SchemaCancion);
