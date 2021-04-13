const express = require("express");
const app = express();

app.use( require("./licenciaturas") );
//app.use( require("./archivos") );
app.use( require("./cuatrimeste") );
app.use( require("./noticias") );
app.use( require("./envioCorreo") );
app.use( require("./awsArchivos") );
app.use( require("./galeria") );

module.exports = app;