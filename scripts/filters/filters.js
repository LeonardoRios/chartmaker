gaugeApp.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      items.forEach(function(item) {
        var itemMatches = false;

        var keys = Object.keys(props);
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  }
});


gaugeApp.filter('toTrustedHtml', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text); 
    	
    };
}]);

gaugeApp.filter('thousandNotation', [function(){
	return function(input) {
    	if(!input){
    		return "";
    	}
    	input = input+"";
    	if(!input.length){
        	return "";
        }
    	
        function insert(text, string, index){
           if(index>0){
              var newText = text.substring(0, index) + string + text.substring(index, text.length);
              return newText;
           }return string+text;
        }
        
        var i = input.length,j = 0;
        
        if(i<=3){
            return input;
        }
        
        while(i--){
           if(j==2){
               input = insert(input, ',', i);
               i++;
               j = -1;
           }
            if(input[i]!=',' && i!=1){
                j++;
            }
        }
        
        return input;
    }
}]);