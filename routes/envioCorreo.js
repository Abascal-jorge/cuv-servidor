const express = require("express");
const app = express();
const { envioCorreo } = require("../controllers/correoControllers");


app.post("/correo", 
    envioCorreo
);


module.exports = app;