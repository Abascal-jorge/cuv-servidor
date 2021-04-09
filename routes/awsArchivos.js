const express = require("express");
const app = express();
const Aws = require("../controllers/aws");

app.post("/subirImagenaws",
    Aws.subiendoImagen
);

app.post("/multiplesImagenes", 
    Aws.multiples
);

module.exports = app;