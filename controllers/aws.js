const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );

exports.subiendoImagen = async ( req, res ) => {

            /**
         * PROFILE IMAGE STORING STARTS
         */
        const s3 = new aws.S3({
            accessKeyId: process.env.ACCESSKEYID,
            secretAccessKey: process.env.SECRETACCESSKEY,
            Bucket: process.env.BUCKET
        });

        /**
         * Single Upload
         */
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
        }).single('archivos');

        profileImgUpload( req, res, ( error ) => {
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
                    // Save the file name into database into profile model
                    res.json( {
                        image: imageName,
                        location: imageLocation
                    } );
                }
            }
        });

}