//Config do server
const app = require("./config/server");
const formulas = app.app.utils.Formulas;


//Tanto WebSocket quanto HTTP serao lidas
//esses 2 protocolos na mesma porta

//Parametrizar a porta
var server = app.listen(8080, function(){
    console.log("Servidor online!.");
});
