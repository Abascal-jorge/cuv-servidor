const express = require("express");
const app = express();
const Aws = require("../controllers/aws");

app.post("/subirImagenaws",
    Aws.subiendoImagen
);

module.exports = app;