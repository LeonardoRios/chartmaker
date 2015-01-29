/* configura os templates de acordo com o menu */
gaugeApp.config(['$routeProvider','$provide',function ($routeProvider,$provide){
	/* diminui o trabalho de chamar o objeto toda hora */
	var pagina = function(url,template,controle){
		/* como realmente se chama os templates */
		$routeProvider.when('/'+url,{templateUrl:'views/'+template,controller:controle})
                
	}
        $routeProvider.otherwise({
            redirectTo: '/'
        });
            
        pagina('/','main.html','CtrlMain');

      
}])