const { enviandocorreo } = require("../middleware/configuracionCorreo");

exports.envioCorreo = async ( req, res ) => {
    await enviandocorreo( req, res );
}