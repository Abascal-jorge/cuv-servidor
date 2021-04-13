const { Schema, model } = require("mongoose");

const GaleriaModels = Schema({
    imagen: {
        type: String
    },
    descripcion: {
        type: String,
        required: true
    },
    categoria:{
        type: String,
        required: true
    }
});

module.exports = model("galeria", GaleriaModels);