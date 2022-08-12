class Formulas{
	constructor(instanciaExpress){
		this.instanciaExpress = instanciaExpress;
	}

	/*
	Ex de uso
	console.log(formulas.calcularGastos({
        nomeAluno: 'will',

        gastosPorMes: [
           {
             nome_mes: 'Fevereiro',
             valorGasto: 12
           },

           {
             nome_mes: 'Janeiro',
             valorGasto: 25
           }
        ]
    }))
	*/

	media(arr){
		let somaMedia = 0;
		for(let i = 0 ; i < arr.length ; i++){
			somaMedia += arr[i];
		}

		return (somaMedia / arr.length);
	}

	getMaxArr(arr){
		return arr.reduce(function(a, b) {
		    return Math.max(a, b);
		}, -Infinity);
	}

	getGastosMeses(gastosPorMes){
		let arrayGastos = [];
		for(let i = 0 ; i < gastosPorMes.length ; i++){
			arrayGastos.push( Number(gastosPorMes[i].valor) );
		}

		return arrayGastos;
	}

	getGastosNomeMeses(gastosPorMes){
		let arrayNomeGastos = [];
		for(let i = 0 ; i < gastosPorMes.length ; i++){
			arrayNomeGastos.push( gastosPorMes[i].nome_mes );
		}

		return arrayNomeGastos;
	}


	mediaGastos(gastosPorMes){
		const apenasGastos = this.getGastosMeses(gastosPorMes);
		return this.media( apenasGastos );
	}

	getDadosMesesTratado(){
		return {
			meses: this.getGastosNomeMeses(),
			gastos: this.getGastosMeses()
		}
	}

	getMesMaisGastou(gastosArr, gastosPorMes){
		let mes = '';
		const maxArr = this.getMaxArr(gastosArr);

		for(let i = 0 ; i < gastosPorMes.length ; i++){
			const registro   = gastosPorMes[i];
			const nome_mes   = registro['nome_mes'];
			const valorGasto = registro['valor'];

			if(valorGasto >= maxArr){
				mes = nome_mes;
			}
		}

		return mes;
	}

	getMesMenosGastou(gastosArr, gastosPorMes){
		let mes = '';

		for(let i = 0 ; i < gastosPorMes.length ; i++){
			const registro   = gastosPorMes[i];
			const nome_mes   = registro['nome_mes'];
			const valorGasto = registro['valor'];

			if(valorGasto <= Math.min.apply(Math, gastosArr) ){
				mes = nome_mes;
			}
		}

		return mes;
	}

	determinarMesesMaiorMenorConsumo(parametros){
		const gastosPorMes = parametros.gastosPorMes;
		const objetoRetorno = {};

		//Copia do array com jsons, igual ao gastosPorMes
		objetoRetorno['gastosPorMes'] = gastosPorMes;

		const mediaGastos = this.mediaGastos(gastosPorMes);
		objetoRetorno['mediaGastos'] = mediaGastos;

		let mesesMaisGastou = [];
		let mesesMenosGastou = [];

		const valoresGastos = this.getGastosMeses(gastosPorMes);
		objetoRetorno['apenasGastos'] = valoresGastos;

		for(let i = 0 ; i < gastosPorMes.length ; i++){
			const registro   = gastosPorMes[i];
			const nome_mes   = registro['nome_mes'];
			const valorGasto = registro['valor'];

			if(valorGasto > mediaGastos){
				mesesMaisGastou.push(nome_mes);
			}

			//Se for abaixo da media
			if(valorGasto <= Math.min.apply(Math, valoresGastos)){
				mesesMenosGastou.push(nome_mes);
			}
		}

		//Nome dos meses
		objetoRetorno['mesMaisGastou'] = this.getMesMaisGastou(valoresGastos, gastosPorMes);
		objetoRetorno['mesMenosGastou'] = this.getMesMenosGastou(valoresGastos, gastosPorMes);
		objetoRetorno['mesesMaisGastou'] = mesesMaisGastou;
		objetoRetorno['mesesMenosGastou'] = mesesMenosGastou;

		//Retorna tambem
		return objetoRetorno;
	}

	calcularGastos(parametros){
		const menesMaiorConsumo = this.determinarMesesMaiorMenorConsumo(parametros);
		const nomeAluno = parametros.nomeAluno;
		const gastosPorMes = parametros.gastosPorMes;
		const objetoRetorno = Object.assign({}, parametros);
		/*
		Modelo

	    gastosPorMes: [
	        {
	           nome_mes: 'JANEIRO'
	           valorGasto: 40 //WATS
	        }
	    ]
		*/

		let soma = 0;
		for(let i = 0 ; i < gastosPorMes.length ; i++){
			const registro   = gastosPorMes[i];
			const nome_mes   = registro['nome_mes'];
			const valorGasto = registro['valor'];
	
			soma += valorGasto ? Number(valorGasto) : 0;
		}

		objetoRetorno['comparacaoMesesConsumo'] = menesMaiorConsumo;
		objetoRetorno['somaGastos'] = soma;
		objetoRetorno['mediaPorMes'] = Number(Number(soma) / 12).toFixed(3);
		objetoRetorno['mediaSemanal'] = Number(objetoRetorno['mediaPorMes'] / 7).toFixed(3);

		return objetoRetorno;
	}

}

//Exporta a variavel
module.exports = function(instanciaExpress){
	return new Formulas(instanciaExpress);
}