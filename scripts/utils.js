var Utils = (function(){
    var url = "api/v1/";
    return {
        Ajax : {
            buscar : function(endp,sucesso,erro){
                $.ajax({
                    type: "GET",
                    url: url+endp,
                    dataType: "json",
                    async: false,
                    success: sucesso,
                    error: erro
                });
            },
            criar : function(endp,obj,sucesso,erro){
                $.ajax({
                    type: "POST",
                    url: url+endp,
                    dataType: "json",
                    data: obj,
                    async: false,
                    success: sucesso,
                    error: erro
                });
            },
            alterar : function(endp,obj,sucesso,erro){
                $.ajax({
                    type: "POST",
                    url: url+endp+"/alterar/",
                    dataType: "json",
                    data: obj,
                    async: false,
                    success: sucesso,
                    error: erro
                });
            },
            deletar : function(endp,obj,sucesso,erro){
                $.ajax({
                    type: "POST",
                    url: url+endp+"/deletar/",
                    dataType: "json",
                    data: obj,
                    async: false,
                    success: sucesso,
                    error: erro
                });
            },
            geral :  function(url,sucesso,erro,obj){
                if(obj!=undefined){
                    $.ajax({
                        type: "POST",
                        url: url,
                        dataType: "json",
                        data: obj,
                        async: false,
                        success: sucesso,
                        error: erro
                    });
                }else{
                    $.ajax({
                        type: "GET",
                        url: url,
                        dataType: "json",
                        async: false,
                        success: sucesso,
                        error: erro
                    });
                }                    
            }
        },
        Moradia : (function(){
            return{
                estadoKey : function(Estado){
                    var estados = Colecao.Estados,
                    i = estados.length-1;
                    while(Estado!=estados[i].Value && i>0){
                        i--;
                    }
                    return estados[i].Key;
                },
                retornarCidade : function(Estado) {
                    Estado = typeof(Estado) == "string" ? Utils.Moradia.estadoKey(Estado) : Estado;
                    var ArrayCidades = new Array();
                    var Cidade = Colecao.Cidades;
                    for (var i = 0; i < Cidade.length; i++) {
                        if (parseInt(Cidade[i].Key / 100000) == Estado)
                        {
                            Cidade[i].Value = Cidade[i].Value.replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ").replace("_", " ");
                            Cidade[i].Value = Cidade[i].Value.toLowerCase();
                            ArrayCidades.push(Cidade[i]);
                        }
                    }
                    if(ArrayCidades.length==0){
                        ArrayCidades.push({ "Key": 0, "Value": "Escolha uma opção" });
                    }
                    return ArrayCidades;
                }
            }
        })(),
        navegador : function(){
          var isOpera = !!window.opera || navigator.userAgent.indexOf('Opera') >= 0;
        // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
            var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
            var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
        // At least Safari 3+: "[object HTMLElementConstructor]"
            var isChrome = !!window.chrome;                          // Chrome 1+
            var isIE = /*@cc_on!@*/false;                            // At least IE6
            if(isChrome){
                return 'Chrome';
            }else if(isFirefox){
                return 'Firefox';
            }else if(isIE){
                return 'IE';
            }else if(isSafari){
                return 'Safari';
            }else if(isOpera){
                return 'Opera';
            }
            return 'Desconhecido';  
        },
        Texto :{
        	strClean : function(str){
                
                str = str.toLowerCase()
                str = str.replace(/[áàâã]/,"a");
                str = str.replace(/[éèê]/,"e");
                str = str.replace(/[íìî]/,"i");
                str = str.replace(/[óòôõ]/,"o");
                str = str.replace(/[úùû]/,"u");
                str = str.replace(/[ñ]/,"n");
                str = str.replace(/[ç]/,"c");
                str = str.replace(/ /gi, "")
                return str.replace(/[^a-z0-9]/gi,''); // final clean up

            }
        },
        Mascaras : {
            numerosTeclado : function(evt){
                var theEvent = evt || window.event;
                var key = theEvent.keyCode || theEvent.which;
                if(key==8 || key==9){
                    return true
                }
                if(key>=96 && key<=105){
                    return true
                }
                if(key>=35 && key<=57){
                    return true
                }
                key = String.fromCharCode( key );
                var regex = /[0-9]/;
                if( !regex.test(key) ) {
                  theEvent.returnValue = false;
                  if(theEvent.preventDefault) theEvent.preventDefault();
                }
            },
            limpar: function (string) {

                var retorno = string.replace(/\D/g, "");

                return retorno;
            },

            addCpf: function (v) {

                v=v.replace(/\D/g,"")                 //Remove tudo o que nÃ£o Ã© dÃ­gito
                v=v.replace(/(\d{3})(\d)/,"$1.$2")    //Coloca ponto entre o terceiro e o quarto dÃ­gitos
                v=v.replace(/(\d{3})(\d)/,"$1.$2")    //Coloca ponto entre o setimo e o oitava dÃ­gitos
                v=v.replace(/(\d{3})(\d)/,"$1-$2")   //Coloca ponto entre o decimoprimeiro e o decimosegundo dÃ­gitos
                return v

            },

            addCnpj: function (cnpj) {
                cnpj = cnpj.replace(/^(\d{2})(\d)/, "$1.$2")             //Coloca ponto entre o segundo e o terceiro dÃ­gitos
                cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") //Coloca ponto entre o quinto e o sexto dÃ­gitos
                cnpj = cnpj.replace(/\.(\d{3})(\d)/, ".$1/$2")           //Coloca uma barra entre o oitavo e o nono dÃ­gitos
                cnpj = cnpj.replace(/(\d{4})(\d)/, "$1-$2")              //Coloca um hÃ­fen depois do bloco de quatro dÃ­gitos
                return cnpj
            },

            addTel: function (telefone) {
                telefone = telefone.replace(/D/g,""); //Remove tudo o que nÃ£o Ã© dÃ­gito
                telefone = telefone.replace(/^(\d\d)(\d)/g, "($1) $2") //Coloca parÃªnteses em volta dos dois primeiros dÃ­gitos
                telefone = telefone.length < 12 ? telefone.replace(/(\d{4})(\d)/, "$1-$2") : telefone.replace(/(\d{4})-(\d)/, "$1-$2")
                return telefone;
            },

            addCep: function (cep) {
                cep = cep.replace(/^(\d{5})(\d)/, "$1-$2");

                return cep;
            }
        }
    }
})();