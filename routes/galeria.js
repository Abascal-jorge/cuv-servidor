const express = require("express");
const app = express();
const GaleriaControllers = require("../controllers/galeriaControllers");
const { check } = require("express-validator");

app.post("/galeria",
    check("descripcion", "Necesitas agregar una descripcion a la imagen").not().isEmpty(),
    check("categoria", "Necesitas agregar una categoria a la imagen").not().isEmpty(),
    GaleriaControllers.subiendoGaleria
);

module.exports = app;