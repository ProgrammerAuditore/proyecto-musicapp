const express = require('express');
const Cancion = require("../models/Cancion");
const router = express.Router();

// * Listar canciones
router.get("/cancion/lista", async (req, res) => {
    const data = await Cancion.find().lean();
    res.render("cancion/lista", { canciones : data});
});

// * Buscar canciones
router.get("/cancion/buscar", async (req, res) => {
    const titulo = req.query.q;
    const regexp = new RegExp(titulo, 'i');
    const data = await Cancion.find({titulo:regexp}).lean();
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
        const nuevo = new Cancion({
            titulo, grupo, anho, genero
        });
        await nuevo.save();

        res.redirect("/cancion/lista");
    } catch (error) {
        next(error);
        res.redirect("/");
    }
});

// * Editar cancion (Frontend)
router.get("/cancion/editar/:_id", async (req, res, next) => {
    try {
        const {_id} = req.params;
        const data = await Cancion.findById(_id).lean();

        res.render("cancion/editar", { cancion: data});
    } catch (error) {
        next(error);
        res.redirect("/");
    }
});

// * Editar cancion en la DB (Backend)
router.put("/cancion/actualizar/:_id", async (req, res, next) => {
    try {
        const {_id} = req.params;
        const { titulo, grupo, anho, genero } = req.body;
        await Cancion.findByIdAndUpdate(_id, {
            titulo, grupo, anho, genero 
        });

        res.redirect("/cancion/lista");
    } catch (error) {
        next(error);
        res.redirect("/");
    }
});

// * Ver cancion (Frontend)
router.get("/cancion/ver/:_id", async (req, res, next) => {
    try {
        const {_id} = req.params;
        const data = await Cancion.findById(_id).lean();

        res.render("cancion/ver", { cancion: data});
    } catch (error) {
        next(error);
        res.redirect("/");
    }
});

// * Eliminar cancion de la DB (Backend)
router.delete("/cancion/eliminar/:_id", async (req, res, next) => {
    try {
        const {_id} = req.params;
        await Cancion.findByIdAndRemove(_id);

        res.redirect("/cancion/lista");
    } catch (error) {
        next(error);
        res.redirect("/");
    }
});

module.exports = router;