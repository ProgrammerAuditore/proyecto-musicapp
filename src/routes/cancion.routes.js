const express = require('express');
const Cancion = require("../models/Cancion");
const router = express.Router();
const CancionConstraints = require('../models/CancionConstraints');
const validate = require("validate.js");

// * Listar canciones
router.get("/cancion/lista", async (req, res) => {
    const data = await Cancion.find().lean();
    res.render("cancion/lista", { canciones : data});
});

// * Buscar canciones
router.get("/cancion/buscar", async (req, res) => {
    const titulo = req.query.q;
    const regexp = new RegExp(titulo, 'i');
    const data = await Cancion.find().or([{titulo:regexp}, {grupo:regexp}]).lean();
    res.render("cancion/lista", { canciones : data});
});


// * Agregar cancion (Frontend)
router.get("/cancion/agregar", (req, res) => {
    res.render("cancion/agregar");
});

// * Agregar cancion en la DB (Backend)
router.post("/cancion/registrar", async (req, res, next) => {
    try {
        const { titulo, grupo, anho, genero } = req.body;   
        const cancion =  { titulo, grupo, anho: parseInt(anho), genero };
        const validateCancion = await validate(cancion, CancionConstraints);

        if(validateCancion){
            let errors = [];
            
            // * Obtener los errores
            for(const error in validateCancion){
                errors.push({ text: validateCancion[error][0] });
            }

            req.flash('msgwarning',"Los datos del formulario son incorrectos.");
            res.render("cancion/agregar", { errors, cancion });
            return;
        }
        
        const nuevo = new Cancion(cancion);
        await nuevo.save();

        req.flash('msgsuccess','Canción se creó exitosamente.');
        res.redirect("/cancion/lista");
    } catch (error) {
        next(error);
        req.flash('msgdanger','Lo siento, se produjo un error.');
        res.redirect("/");
    }
});

// * Editar cancion (Frontend)
router.get("/cancion/editar/:_id", async (req, res, next) => {
    try {
        const {_id} = req.params;
        const data = await Cancion.findById(_id).lean();

        if(!data){
            req.flash('msgdanger','Lo siento, canción sin existencia.');
            res.redirect("/");
            return;
        }

        res.render("cancion/editar", { cancion: data});
    } catch (error) {
        next(error);
        req.flash('msgdanger','Lo siento, se produjo un error.');
        res.redirect("/");
    }
});

// * Editar cancion en la DB (Backend)
router.put("/cancion/actualizar/:_id", async (req, res, next) => {
    try {
        const {_id} = req.params;
        const { titulo, grupo, anho, genero } = req.body;
        const cancion =  { titulo, grupo, anho: parseInt(anho), genero };
        const validateCancion = await validate(cancion, CancionConstraints);

        if(validateCancion){
            let errors = [];
            
            // * Obtener los errores
            for(const error in validateCancion){
                errors.push({ text: validateCancion[error][0] });
            }

            req.flash('msgwarning',"Falló al actualizar la canción");
            res.redirect(`/cancion/editar/${_id}`);
            return;
        }

        const data = await Cancion.findByIdAndUpdate(_id, cancion);

        if(!data){
            req.flash('msgdanger','Lo siento, canción sin existencia.');
            res.redirect("/");
            return;
        }

        req.flash('msgsuccess','La canción se actualizo exitosamente.');
        res.redirect("/cancion/lista");
    } catch (error) {
        next(error);
        req.flash('msgdanger','Lo siento, se produjo un error.');
        res.redirect("/");
    }
});

// * Ver cancion (Frontend)
router.get("/cancion/ver/:_id", async (req, res, next) => {
    try {
        const {_id} = req.params;
        const data = await Cancion.findById(_id).lean();

        if(!data){
            req.flash('msgdanger','Lo siento, canción sin existencia.');
            res.redirect("/");
            return;
        }

        res.render("cancion/ver", { cancion: data});
    } catch (error) {
        next(error);
        req.flash('msgdanger','Lo siento, se produjo un error.');
        res.redirect("/");
    }
});

// * Eliminar cancion de la DB (Backend)
router.delete("/cancion/eliminar/:_id", async (req, res, next) => {
    try {
        const {_id} = req.params;
        const data = await Cancion.findByIdAndRemove(_id);

        if(!data){
            req.flash('msgdanger','Lo siento, canción sin existencia.');
            res.redirect("/");
            return;
        }

        req.flash('msgsuccess','La canción se elimino exitosamente.');
        res.redirect("/cancion/lista");
    } catch (error) {
        next(error);
        req.flash('msgdanger','Lo siento, se produjo un error.');
        res.redirect("/");
    }
});

module.exports = router;