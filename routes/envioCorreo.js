const express = require("express");
const app = express();
const { envioCorreo } = require("../controllers/correoControllers");
const { check } = require("express-validator");

app.post("/correo", 
    check("nombre","Ingresa tu nombre completo").not().isEmpty(),
    check("asunto", "Ingresa la descripcion de lo que requieres").not().isEmpty(),
    check("email", "Ingresa un email valido").not().isEmpty(),
    check("telefono", "Ingresa un numero telefonico").not().isEmpty(),
    check("area", "Ingresa la licenciatura que te interesa").not().isEmpty(),
    check("comentario", "ingresa un comentario que nos ayude").not().isEmpty(),
    envioCorreo
);


module.exports = app;