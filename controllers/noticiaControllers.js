const Noticia  = require("../models/noticiasModels");
const { validationResult } = require("express-validator");

exports.agregarnoticia = async ( req, res ) => {

    const error = validationResult(req);

    if( !error.isEmpty() ){
        return res.status(400).json({
            ok: false,
            error: error.array()
        });
    }

    const datos = req.body;

    try {
        
        let noticia  = new Noticia( datos );

        await noticia.save();

        res.json({
            ok: true,
            noticia
        });

    } catch (error) {

        return res.status.json({
            ok: false,
            error
        });
    }
}