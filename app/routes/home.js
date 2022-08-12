const homeRoute = function(instanciaExpress){
	instanciaExpress.get('/', function(req, res){
		//Passando parametros para a view html do ejs
		res.render("home.ejs");
	});
}

//Exporta a variavel
module.exports = homeRoute;