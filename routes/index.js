const express = require("express");
const app = express();

app.use( require("./licenciaturas") );
app.use( require("./archivos") );
app.use( require("./cuatrimeste") );
app.use( require("./noticias") );

module.exports = app;