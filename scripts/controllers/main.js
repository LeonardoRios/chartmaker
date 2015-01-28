gaugeApp.controller('CtrlMain',['$scope', function($scope){

    $scope.Grafico = {
        nome: "",
        tipo: "area",
        linhas : 1,
        colunas: 2,
        largura: 500,
        altura: 300,
        Tabela: {
            colunas: ["Índice", "Valor 1", "Valor 2"],
            linhas: [
                ['Work',     70, 18],
                ['Eat',      76, 32],
                ['Watch TV', 23, 23],
                ['Sleep',    31, 56]
            ]
        }
    }


    $scope.Visual = {
        iniciarGrafico: function(){
            // manometro e pizza -> 1 valor apenas
            Plugins.Grafico.iniciar("grafico", $scope.Grafico.tipo);
            Plugins.Grafico.Dados.colunas($scope.Grafico.Tabela.colunas);
            Plugins.Grafico.Dados.linhas($scope.Grafico.Tabela.linhas);
            Plugins.Grafico.exibir($scope.Grafico.nome, $scope.Grafico.largura, $scope.Grafico.altura);
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
                }
            });
            $( "#grafico" ).dialog( "open" );
        },
        Imagem: {
            download: function(){
                Plugins.Grafico.Imagem.converter("grafico","imagem");
                var link = document.createElement("a");
                link.download = $scope.Grafico.nome;
                link.href = document.getElementById("imagem").children[0].src
                link.click();
            }
        }
    }


    $scope.Visual.abrirGrafico();
}]);

