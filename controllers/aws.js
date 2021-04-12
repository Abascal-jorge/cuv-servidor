const { s3 } = require("../helpers/awsFunciones");
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );
const Licenciatura = require("../models/LicenciaturasModels");
const Noticia = require("../models/noticiasModels");

exports.subiendoImagen = async ( req, res ) => {

    const id = req.params.id;

    const checkFileType = ( file, cb ) => {
        // Allowed ext
        const filetypes = /jpeg|jpg|png|gif/;
        // Check ext
        const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
        // Check mime
        const mimetype = filetypes.test( file.mimetype );
    
        if( mimetype && extname ){
            return cb( null, true );
        } else {
            cb( 'Error: Images Only!' );
        }
    }


    const profileImgUpload = multer({
        storage: multerS3({
            s3: s3,
            bucket: process.env.BUCKET,
            acl: 'public-read',
            key: function (req, file, cb) {
                cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
            }
        }),
        limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
        fileFilter: function( req, file, cb ){
            checkFileType( file, cb );
        }
    }).single('archivos');


    try {
        let licenciatura = await Licenciatura.findById( id );

        profileImgUpload( req, res, async ( error ) => {
            //console.log( 'requestOkokok', req.file );
            //console.log( 'error', error );
            if( error ){
                //console.log( 'errors', error );
                return res.status(400).json( { error: error } );
            } else {
                // If File not found
                if( req.file === undefined ){
                    //console.log( 'Error: No File Selected!' );
                    return res.status(400).json( 'Error: No File Selected' );
                } else {
                    // If Success
                    const imageName = req.file.key;
                    const imageLocation = req.file.location;

                    licenciatura.imagen = imageLocation;

                    licenciatura = await Licenciatura.findByIdAndUpdate({ _id: id }, { $set : licenciatura}, { new: true });
                    // Save the file name into database into profile model
                    res.json( {
                        ok: true,
                        licenciatura,
                        image: imageName,
                        location: imageLocation
                    } );
                }
            }
        });


    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        });
    }
}

//https://github.com/imranhsayed/file-uploads-aws-react-node

//subiendo multiples imagenes

exports.multiples = async ( req, res ) => {

    const id = req.params.id; 

    const uploadsBusinessGallery = multer({
        storage: multerS3({
            s3: s3,
            bucket: process.env.BUCKET,
            acl: 'public-read',
            key: function (req, file, cb) {
                cb( null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
            }
        }),
        limits:{ fileSize: 2000000 } // In bytes: 2000000 bytes = 2 MB
    }).array( 'galleryImage', 4 );

    try {

        let noticia = await Noticia.findById( id );

        
        uploadsBusinessGallery( req, res, async ( error ) => {
            //console.log( 'files', req.files );
            if( error ){
                //console.log( 'errors', error );
                return res.status(400).json( { ok: false, error: error } );
            } else {
                // If File not found
                if( req.files === undefined ){
                
                    //console.log( 'Error: No File Selected!' );
                    return res.status(400).json( { ok: false, error: 'Error: No File Selected' });
                } else {
                    // If Success
                    let fileArray = req.files;
                    let	fileLocation;
                    const galleryImgLocationArray = [];
                    for ( let i = 0; i < fileArray.length; i++ ) {
                        fileLocation = fileArray[ i ].location;
                        console.log( 'filenm', fileLocation );
                        galleryImgLocationArray.push( fileLocation );
                        noticia[ "imagen" + i ] = fileLocation;
                    }

                    noticia = await Noticia.findByIdAndUpdate({ _id: id }, { $set : noticia}, { new: true });
                    // Save the file name into database
                    res.json( {
                        noticia,
                        filesArray: fileArray,
                        locationArray: galleryImgLocationArray
                    } );
                }
            }
        });

        
    } catch (error) {
        res.status(400).json({
            ok: false,
            error
        });
    }

}

//Eliminando un objeto 