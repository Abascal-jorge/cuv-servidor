const express = require("express");
const app = express();
const CuatrimestreControllers = require("../controllers/cuatrimestreControllers");
const { check } = require("express-validator");

app.post("/cuatrimestre", 
    check("materia1", "Necesitas agregar la primera materia del cuatrimestre").notEmpty(),
    check("materia2", "Necesitas agregar al menos dos materia al cuatrimestre").notEmpty(),
    check("licenciatura", "Necesitas definir a que licenciatura agregaras el cuatrimestre").notEmpty(),
    CuatrimestreControllers.agregandoCuatrismestre
);

app.get("/cuatrimestre/:id",
    CuatrimestreControllers.obtenerCuatrimestreLicenciatura
);

app.get("/cuatrimestre", 
    CuatrimestreControllers.obtenerTodosCuatrimestre
);

module.exports = app;