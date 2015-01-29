msgApp.directive('ckEditor', function() {
  return {
    require: '?ngModel',
    link: function(scope, elm, attr, ngModel) {
      var ck = CKEDITOR.replace(elm[0]);

      if (!ngModel) return;

      ck.on('instanceReady', function() {
        ck.setData(ngModel.$viewValue);
      });

      function updateModel() {
          scope.$apply(function() {
              ngModel.$setViewValue(ck.getData());
          });
      }
        
      ck.on('change', updateModel);
      ck.on('key', updateModel);
      ck.on('dataReady', updateModel);
        
        ck.on('blur',function(){
            if(attr.embBlur){
                var str = attr.embBlur.split(',');
                var funcao = eval("scope."+str[0]);
                var obj = eval("scope."+str[1]);
                var campo = str[2];
                funcao(obj,campo, str[3], str[4]);
            }
        })

      ngModel.$render = function(value) {
        ck.setData(ngModel.$viewValue);
      };
    }
  };
});
