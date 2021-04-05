const { Schema, model } = require("mongoose");

const LicenciaturasSchema = Schema({
    area: {
        type: String
    },
    licenciatura: {
        type: String
    },
    objetivoGeneral: {
        type: String
    },
    imagen:{
        type: String
    },
    rvoel:{
        type: String,
        required: true,
        unique: true
    }
});

module.exports = model("Licenciaturas", LicenciaturasSchema);