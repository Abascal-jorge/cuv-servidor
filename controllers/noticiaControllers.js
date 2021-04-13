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

    const error = validationResult(req);

    if( !error.isEmpty() ){
        return res.status(400).json({
            ok: false,
            error: error.array()
        });
    }

    try {
        const datos = req.body;
        //console.log( datos );
        const noticia = await Noticia.findByIdAndUpdate( id, datos, { new: true });

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

//Obtener todas las noticias
exports.obtenerNoticias = async ( req, res ) => {
    try {
        
        const noticias = await Noticia.find();

        res.json({
            ok: false,
            noticias
        });

    } catch (error) {

        return res.status().json({
            ok: false,
            error
        });        
    }

}