const express = require("express");
const app = express();
const Aws = require("../controllers/aws");

app.post("/subirImagenaws/:id",
    Aws.subiendoImagen
);


app.post("/multiplesImagenes/:id", 
    Aws.multiples
);


module.exports = app;