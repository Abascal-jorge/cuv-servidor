const { Schema, model } = require("mongoose");

const CuatrismesteModel = Schema({
    materia1: {
        type: String,
        required: true
    },
    materia2: {
        type: String,
        required: true
    },
    materia3: {
        type: String
    },
    materia4: {
        type: String
    },
    materia5: {
        type: String
    },
    materia6: {
        type: String
    },
    materia7: {
        type: String
    },
    materia8: {
        type: String
    },
    materia9: {
        type: String
    },
    materia10: {
        type: String
    },
    licenciatura: {
        type: Schema.Types.ObjectId,
        ref: 'Licenciaturas',
        required: true
    }
});

module.exports = model("Cuatrimestre", CuatrismesteModel);