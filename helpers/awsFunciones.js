const aws = require( 'aws-sdk' );

/**
 * PROFILE IMAGE STORING STARTS
 */
exports.s3 = new aws.S3({
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
    Bucket: process.env.BUCKET
});

