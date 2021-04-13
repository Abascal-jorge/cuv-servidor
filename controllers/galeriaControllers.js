const Galeria = require("../models/galeriaModels");
const { validationResult } = require("express-validator");

exports.subiendoGaleria = async ( req, res ) => {

    const error = validationResult(req);

    if( !error.isEmpty() ){

        return res.status(400).json({
            ok: false,
            error: error.array()
        });

    }

    const datos = req.body;

    try {

        let galeria = new Galeria( datos );   
        
        await galeria.save();

        res.json({
            ok: true,
            galeria
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            error
        });
    }

}