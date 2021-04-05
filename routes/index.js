const express = require("express");
const app = express();

app.use( require("./licenciaturas") );
app.use( require("./archivos") );
app.use( require("./cuatrimeste") );

module.exports = app;