gaugeApp.controller('CtrlMain',['$scope', function($scope){

    $scope.Grafico = {
        nome: "",
        tipo: "area",
        linhas : 1,
        colunas: 2,
        largura: 500,
        altura: 300,
        Tabela: {
            colunas: ["", "Coluna 1"],
            linhas: [['Linha 1', 0]]
        },
        iniciar : function() {
            if(localStorage.Grafico){
                var grafico = JSON.parse(localStorage.Grafico);
                this.nome = grafico.nome;
                this.largura = grafico.largura;
                this.altura = grafico.altura;
                this.tipo = grafico.tipo;
                this.Tabela = grafico.Tabela;
                $scope.Visual.iniciarGrafico();
            }else{
                this.reiniciar();
            }
        },
        salvar: function(){
            localStorage.Grafico = JSON.stringify($scope.Grafico);
        },
        reiniciar: function(){
            this.nome = "";
            this.largura = 500;
            this.altura = 300;
            this.Tabela = {
                colunas: ["", "Coluna 1"],
                linhas: [
                    ['Linha 1', 0],
                ]
            };
            $scope.Visual.iniciarGrafico();
        }
    }


    $scope.Visual = {
        iniciarGrafico: function(){
            // manometro e pizza -> 1 valor apenas
            Plugins.Grafico.iniciar("grafico", $scope.Grafico.tipo);
            Plugins.Grafico.Dados.colunas($scope.Grafico.Tabela.colunas);
            Plugins.Grafico.Dados.linhas($scope.Grafico.Tabela.linhas);
            Plugins.Grafico.exibir($scope.Grafico.Tabela.colunas[0], $scope.Grafico.largura, $scope.Grafico.altura);
            $scope.Grafico.salvar();
        },
        Linha: {
            adicionar: function(){
                var tabela = $scope.Grafico.Tabela,
                total = tabela.colunas.length-1,
                novaLinha = ["Linha " + (tabela.linhas.length+1)];
                while(total--){
                    novaLinha.push(0);
                }
                tabela.linhas.push(novaLinha);
                $scope.Visual.iniciarGrafico();
            },
            remover: function(index){
                var tabela = $scope.Grafico.Tabela;
                if(tabela.linhas.length > 1){
                    tabela.linhas.splice(index, 1);
                    $scope.Visual.iniciarGrafico();
                }else{
                    Plugins.Mensagem.alerta("A tabela deve ter no mínimo 1 linha");
                }
            }
        },
        Coluna: {
            adicionar: function(){
                if($scope.Grafico.tipo === 'pizza'){
                    return false;
                }
                var tabela = $scope.Grafico.Tabela;
                tabela.colunas.push("Coluna " + tabela.colunas.length );
                tabela.linhas.forEach(function(linha){
                    linha.push(0);
                });
                $scope.Visual.iniciarGrafico();
            },
            remover: function(index){
                if(index === 0){
                    return false;
                }
                var tabela = $scope.Grafico.Tabela;
                if($scope.Grafico.tipo!=='pizza' && tabela.colunas.length > 2){
                    tabela.colunas.splice(index,1);
                    tabela.linhas.forEach(function(linha){
                        linha.splice(index,1);
                    });
                    $scope.Visual.iniciarGrafico();
                }else{
                    Plugins.Mensagem.alerta("A tabela deve ter no mínimo 1 coluna");
                }
            }
        },
        abrirGrafico: function(){
            $scope.Visual.iniciarGrafico();
            $( "#grafico" ).dialog({
                autoOpen: true,
                height: +$scope.Grafico.altura+65,
                width: +$scope.Grafico.largura+35,
                position: { my: "right top", at: "right top", of: window },
                title: "Gráfico",
                show: {
                    effect: "drop",
                    duration: 1000
                },
                hide: {
                    effect: "drop",
                    duration: 1000
                },
                close: function(){
                    $('#btn-visualizar').show(200);
                }
            });
            $('#btn-visualizar').hide(200);
            $( "#grafico" ).dialog( "open" );
        },
        Imagem: {
            download: function(){
                Plugins.Grafico.Imagem.converter("grafico","imagem");
                var link = document.createElement("a");
                link.download = $scope.Grafico.Tabela.colunas[0] || "grafico_"+$scope.Grafico.tipo;
                link.href = document.getElementById("imagem").children[0].src
                link.click();
            }
        }
    }

    $scope.Grafico.iniciar();
    $scope.Visual.abrirGrafico();
}]);

