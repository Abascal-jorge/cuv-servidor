const fs = require("fs");

exports.eliminandoImagenes =  ( imagen ) => {

    try {
        fs.unlinkSync( imagen );
    } catch (error) {
        console.log(error);
    }
    
    
}