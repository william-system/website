//Importar o framework express
const express = require("express");

//Importa o consign(midle-ware)
const consign = require("consign");

//Importa o body-parser
const bodyParser = require("body-parser");

//Importa o express validator
const expressValidator = require("express-validator");

//Inicializar o obj do express na variavel app
const app = express();

//Configurar o EJS para engine de views
//Usar EJS como engine
app.set("view engine", "ejs");
//Pasta das views
app.set("views", "~/app/views");


//Configurar o midle-ware
//Arquivos estaticos(lado do cliente)
app.use( express.static("~/app/public") );

//Body parser
//Para quando houver um post do formulario em alguma requisicao, podemos recuperar os dados via JSON a partir da propiedade body 
app.use( bodyParser.urlencoded( {extended: true} ) );

//Express validator(funcoes nativas de validacao)
//app.use( expressValidator() );


//Auto load de modulos com o consign para o obj app
consign().include("~/app/routes")
         .then("~/app/models")
         .then("~/app/controllers")
         .then("~/app/utils")

         //Insere dentro do objeto app
         .into(app)



//Exporta a variavel app para o app importar
module.exports = app;