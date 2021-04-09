const express = require("express");
const app = express();
const subirArchivoControllers = require("../controllers/subirArchivoControllers");
const Aws = require("../controllers/aws");

app.post("/archivo/:id", 
    subirArchivoControllers.subirArchivoImagen
);

module.exports = app;

