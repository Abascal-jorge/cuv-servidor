const express = require("express");
const ControllerLicenciatura = require("../controllers/controllerLicenciatura");
const { check } = require("express-validator");
const app = express();


app.post( "/licenciaturas", 
    check("area", "La area es necesaria para continuar").not().isEmpty(),
    check("licenciatura", "El nombre de la licenciatura es un campo obligatorio").not().isEmpty(),
    check("objetivoGeneral", "Es importante agregar una descripcion a la carrera").not().isEmpty(),
    check("rvoel", "El rvoel es sumamente necesario").not().isEmpty(),
    check("area", "La area es necesaria para continuar").not().isEmpty(),
    ControllerLicenciatura.agregandoLicenciatura
);

app.get("/licenciaturas",
    ControllerLicenciatura.obteniendoLicenciaturas
);

app.get("/licenciaturas/:id",
    ControllerLicenciatura.obtenerLicenciaturaID
);

app.put("/licenciaturas/:id",
    check("area", "La area es necesaria para continuar").not().isEmpty(),
    check("licenciatura", "El nombre de la licenciatura es un campo obligatorio").not().isEmpty(),
    check("objetivoGeneral", "Es importante agregar una descripcion a la carrera").not().isEmpty(),
    check("rvoel", "El rvoel es sumamente necesario").not().isEmpty(),
    check("area", "La area es necesaria para continuar").not().isEmpty(),
    ControllerLicenciatura.actualizarLicenciatura
);

app.delete("/licenciaturas/:id",
    ControllerLicenciatura.eliminarLicenciatura
);

module.exports = app;
