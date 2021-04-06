const express = require("express");
const app = express();
const { check } = require("express-validator");
const NoticiaControllers = require("../controllers/noticiaControllers");

app.post("/noticia", 
    check("titulo", "Necesitas agregar un titulo a tu noticia").not().isEmpty(),
    check("noticia", "Necesitas agregar una noticia").not().isEmpty(),
    check("descripcion", "Necesitas agregar una pequeña descripcion de la noticia").not().isEmpty(),
    NoticiaControllers.agregarnoticia
);

module.exports = app;  