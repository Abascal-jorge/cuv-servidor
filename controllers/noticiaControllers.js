const Noticia  = require("../models/noticiasModels");
const { validationResult } = require("express-validator");

//Agregando una noticia
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

//Eliminando una noticia
exports.eliminandoNoticia = async ( req, res ) => {

    const id = req.params.id;

    try {
        
        let noticia = await Noticia.findByIdAndDelete( id );

        res.json({
            ok: true,
            noticia
        });

    } catch (error) {
        
        return res.status(400).json({
            ok: false,
            error
        });

    }

}

//Actualizando una noticia
exports.actualizandoNoticia = async ( req, res ) => {

    const id = req.params.id;

    try {

        let noticia = await Noticia.findById(id);

        res.json({
            noticia
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            error
        });
    }

}