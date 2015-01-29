var Controle = (function(){
    return{
        Loading : (function(){
        	return{
        		start : function(){
			       $('#loadingDiv').fadeIn(300);
        		},
        		stop: function(){
			       $('#loadingDiv').fadeOut(300);
        		}
        	}
        })()
    }
})();