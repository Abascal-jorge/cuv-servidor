const Licenciaturas = require("../models/LicenciaturasModels");
const { validationResult } = require('express-validator');
const { eliminandoImagenes } = require("../helpers/eliminarArchivos");
//Agregando una licenciatura a la base de datos
exports.agregandoLicenciatura = async ( req, res ) => {

    const error = validationResult(req);

    if( !error.isEmpty() ){
        return res.status(400).json({
            ok: false,
            error: error.array()
        });
    }

    const { rvoel } = req.body;
    let licenciatura = await Licenciaturas.findOne({ rvoel });

    if( licenciatura ){
        return res.status(400).json({ ok: false, msg: "Revoel existente"});
    }

    const datos = req.body;

    licenciatura = new Licenciaturas( datos );

    try {
        await licenciatura.save();
        res.json({
            ok: true,
            datos
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        });
    }

};

//Obtener todas las licenciaturas
exports.obteniendoLicenciaturas = async ( req, res ) => {

    try {
        let licenciaturas = await Licenciaturas.find({});
        res.json({
            ok: true,
            licenciaturas
        });   
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        });
    }

}

//Obtener una licenciatura especifica
exports.obtenerLicenciaturaID = async ( req, res ) => {

    const id = req.params.id;

    try {

        let licenciatura = await Licenciaturas.findById(id);

        res.json({
            ok: true,
            licenciatura
        });

    } catch (error) {
        
        res.status(400).json({
            ok: false,
            error,
            id
        });
    
    }
}

//Actualizar una licenciatura
exports.actualizarLicenciatura = async ( req, res ) => {
    

    //Si no contiene los campos validos a cambiar
    const error = validationResult( req );

    if( !error.isEmpty() ){
        return res.status(400).json({
            ok: false,
            error: error.array()
        });
    }

    const id = req.params.id;
    const datos = req.body;

    try {
        const licenciatura = await Licenciaturas.findByIdAndUpdate(id, datos, { new: true });

        res.json({
            ok: true,
            licenciatura,
            msg: "Datos actualizados correctamente"
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        });
    }

}

//Eliminar una licenciaturas
exports.eliminarLicenciatura = async ( req, res ) => {

    const id = req.params.id;

    try {
        
        let licenciatura = await Licenciaturas.findByIdAndDelete(id);

        /* Elimina la imagen del servidor */
        eliminandoImagenes( licenciatura.imagen  );
        //////////////////////

        res.json({
            ok: true,
            msg: "Licenciatura eliminada correctamente",
            imagen: licenciatura.imagen
        });

    } catch (error) {
        res.status( 400 ).json( { 
            ok: false,
            error
        } );
    }

}