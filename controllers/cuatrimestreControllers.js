const Cuatrimestre = require("../models/cuatrimesteModel");
const { validationResult } = require("express-validator");


//Agregar cuatrimestre a una licenciatura
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

//Obtener cuatrismestre por licenciatura
exports.obtenerCuatrimestreLicenciatura = async ( req, res ) => {

    const id = req.params.id;

    try {

        let cuatrimestre = await Cuatrimestre.find( { licenciatura: id } );

        /*
        if( !cuatrimestre.isEmpty() ){
            return res.status(400).json({ ok: false, errores: "No hay Elementos"});
        }*/

        res.json({
            ok: true,
            cuatrimestre
        });
        
    } catch (error) {
        return res.status(400).json({ ok: false, error});
    }
}

//Obtener todos los cuatrimestre
exports.obtenerTodosCuatrimestre = async ( req, res ) => {

    try {
        let cuatrimestre = await Cuatrimestre.find();
        /*
        if( !cuiatrimestre ){
            return res.status(400).json({ ok: false, error: "No hay elementos" });
        }
        */

        res.json({
            ok: true,
            cuatrimestre
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            error
        });
    }
}

//Actualizar por id cuatrimestre

//Eliminar todos los cuatrimestre pertenicientes a una licenciatura
exports.eliminandoCuatrimestreLicenciatura = async ( req, res ) => {
    const id = req.params.id;
    try {
        let cuatrimestre = await Cuatrimestre.deleteMany({ licenciatura: id });
        res.json({
            ok: true,
            msg: "Cuatrimestre de la licenciatura eliminados",
            cuatrimestre
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        });
    }
}

//Eliminar solo un cuatrimestre de una licenciatura
exports.eliminandoCuatrimestre = async ( req, res ) => {
    const id = req.params.id;
    try {
        let cuatrismestre = await Cuatrimestre.findByIdAndDelete( id );
        res.json({
            ok: true,
            cuatrismestre
        });
    } catch (error) {  
        res.status(400).json({
            ok: false,
            cuatrimestre
        });
    }
}