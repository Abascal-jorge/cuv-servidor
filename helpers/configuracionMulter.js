const shortid = require("shortid");
const multer = require("multer");

exports.multerconfiguracion = ( direccion ) => {

    const configuracionMulter = {
        limits : { fileSize : 1024 * 1024 * 10 },
        storage: fileStorage = multer.diskStorage({
            destination: ( req, file, cb) => {
                cb(null, __dirname + `${direccion}` )
            },
            filename: ( req, file, cb)  => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf("."), file.originalname.length)
                cb(null, `${shortid.generate()}${extension}`);
            }
        })
    }

    return configuracionMulter;
}
