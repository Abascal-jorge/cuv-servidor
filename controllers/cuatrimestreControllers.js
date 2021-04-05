const Cuatrimestre = require("../models/cuatrimesteModel");
const { validationResult } = require("express-validator");


exports.agregandoCuatrismestre = async ( req, res ) => {
    
    const error = validationResult(req);

    if( !error.isEmpty() ){
        return res.status(400).json({ ok: false, error: error.array() });
    }

    const datos = req.body;

    try {
        
        let cuatrimestre = new Cuatrimestre( datos );

        await cuatrimestre.save();

        res.json({
            ok: true,
            cuatrimestre
        });

    } catch (error) {
        return res.status(400).json({ ok: false, error });
    }
}

exports.obtenerCuatrimestreLicenciatura = async ( req, res ) => {

    const id = req.params.id;

    try {

        let cuatrimestre = await Cuatrimestre.find( { licenciatura: id } );
        res.json({
            ok: true,
            cuatrimestre
        });
        
    } catch (error) {
        return res.status(400).json({ ok: false, error});
    }
}