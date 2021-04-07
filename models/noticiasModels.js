const { model, Schema} = require("mongoose");


const NoticiasModel = Schema({
    titulo: {
        type: String,
        required: true
    },
    noticia: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    tituloimagen:{
        type: String
    },
    imagen: {
        type: String
    },
    imagen2: {
        type: String
    },
    fecha:{
        type: Date,
        default: Date.now()
    }
});

module.exports = model("Noticias", NoticiasModel);