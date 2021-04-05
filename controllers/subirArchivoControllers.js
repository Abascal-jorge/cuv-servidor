const multer = require("multer");
const shortid = require("shortid");
const Licenciaturas = require("../models/LicenciaturasModels");


//Guarda la imagen especificada en la carpeta del servidor, y de igual manera actualiza la licenciatura
// Agregando la url del servidor en la imagenen
exports.subirArchivoImagen = async ( req, res, next) => {

    const id = req.params.id

    //toma el nombre completo de la imagen, lo guarda en la posicion indica y pósteriormente separa el .extension del archivo y
    // y le crea uun nombre diferente con el shortid
    const configuracionMulter = {
        limits : { fileSize : 1024 * 1024 * 10 },
        storage: fileStorage = multer.diskStorage({
            destination: ( req, file, cb) => {
                cb(null, __dirname+`/../cuvImagenes/licenciaturas`)
            },
            filename: ( req, file, cb)  => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf("."), file.originalname.length)
                cb(null, `${shortid.generate()}${extension}`);
            }
        }) 
    }


    try {
        let licenciatura = await Licenciaturas.findById( id );   

        const upload = multer(configuracionMulter).single("archivo");

        upload(req, res, async (error) =>{
            //console.log(req.file);
            if(!error){

                const archivodirectorio = __dirname + `/../cuvImagenes/licenciaturas/${req.file.filename}`;
                licenciatura.imagen = archivodirectorio;

                licenciatura = await Licenciaturas.findByIdAndUpdate({ _id: id }, { $set : licenciatura}, { new: true });
        
                res.json({ 
                    licenciatura
                });
                return next();
            }else{
                console.log(error);
                return next();
            }
        });


    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "Estas actualizando la imagen de una licenciatura que no existe"
        });   
    }
}


//Para descargar las imagenes en un futuro guardar codigo segmento
/*
exports.descargarArchivo = async (req, res, next) => {
    const { archivo } = req.params;
    const enlace = await Enlaces.findOne({ nombre: archivo});
    //console.log(enlace);

    const archivodirectorio = __dirname + `/../cuvImagenes/licenciaturas/${archivo}`;
    res.download(archivodirectorio);
    
    //Eliminar archivo y collecion

    //SI LAS DESCARGAR SON IGUALES A 1 BORRAR LA ENTRADA Y BORRAR EL ARCHIVO
    const { descargas, nombre } = enlace;
    if(descargas === 1 ){
        //eLIMINAR EL ARCHIVO
        req.archivo = nombre;
        //ELIMINAR LA ENTRADA DE LA BD
        await Enlaces.findOneAndRemove(enlace.id);
        next();
    }else{
        //si las descargas son > a 1 - restar 1
        enlace.descargas --;
        await enlace.save();
    }
}
*/