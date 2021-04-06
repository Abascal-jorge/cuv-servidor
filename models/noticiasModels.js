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
    }
});

module.exports = model("Noticias", NoticiasModel);