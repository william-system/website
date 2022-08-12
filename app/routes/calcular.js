const calcularRoute = function(instanciaExpress){
	instanciaExpress.get('/calcular', function(req, res){
		const parametros = req.query;
		const formulas = instanciaExpress.app.utils.Formulas;
		let gastosPorMesArray = [];
		const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

		//Monta o array
		for(let i = 0 ; i < meses.length ; i++){
			const nome_mes = String(meses[i]);
			const valor = parametros[ 'n' + String(i) ];

			gastosPorMesArray.push( {
				nome_mes: nome_mes,
				valor: valor
			} );
		}

		const calculos = formulas.calcularGastos({
	        nomeAluno: parametros['fnome'],

	        gastosPorMes: gastosPorMesArray
	    });

		//Passando parametros para a view html do ejs
		res.render("calcular.ejs", {
			nomeAluno: parametros['fnome'],
			gastoLavadora: calculos.somaGastos,
			mesMaiorConsumo: calculos.comparacaoMesesConsumo.mesMaisGastou,
			mesMenorConsumo: calculos.comparacaoMesesConsumo.mesMenosGastou,
			mesesMaisGastou: calculos.comparacaoMesesConsumo.mesesMaisGastou,
			mesesMenosGastou: calculos.comparacaoMesesConsumo.mesesMenosGastou,
			mediaPorMes: calculos.mediaPorMes,
			mediaSemanal: calculos.mediaSemanal
		});
	});
}

//Exporta a variavel
module.exports = calcularRoute;