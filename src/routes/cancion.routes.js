const express = require('express');
const router = express.Router();

router.get("/cancion/agregar", (req, res) => {
    res.render("cancion/agregar");
});

router.get("/cancion/editar", (req, res) => {
    res.render("cancion/editar");
});

router.get("/cancion/ver", (req, res) => {
    res.render("cancion/ver");
});

module.exports = router;