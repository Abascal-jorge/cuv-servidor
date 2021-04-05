const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../config/config");
require('dotenv').config()
const app = express();

// parse application/x-www-form-urlencoded
app.use( express.urlencoded( { extended: true } ) )
app.use( express.json() )

//Activando cors
app.use( cors() );

//Conectando base de datos
dbConnection();

app.use( require("../routes/index") );

app.listen( process.env.PORT , () => {
    console.log( `Conectado al servidor en el puerto ${ process.env.PORT }` );
});

