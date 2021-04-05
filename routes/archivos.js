const express = require("express");
const app = express();
const subirArchivoControllers = require("../controllers/subirArchivoControllers");

app.post("/archivo/:id", 
    subirArchivoControllers.subirArchivoImagen
);

module.exports = app;

