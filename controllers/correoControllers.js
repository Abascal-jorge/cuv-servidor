const { enviandocorreo } = require("../middleware/configuracionCorreo");
const { validationResult } = require("express-validator");

exports.envioCorreo = async ( req, res ) => {

    const error = validationResult(req);

    if( !error.isEmpty() ){
        return res.status(400).json({
            ok: false,
            error: error.array()
        });
    }

    await enviandocorreo( req, res );
}