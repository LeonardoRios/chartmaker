gaugeApp.factory('FileReaderFactory',[function(){
    var reader = function(table, fileInput, callback){
        var that = this;
        that.table = table || "Tick";
        that.fileInput = fileInput;
        that.content = "";
        that.rows = 0;
        that.cols = 0;
        that.tableContent = [];
        that.read = function(e){
            var file = that.fileInput.files[0];
            var textType = /text.*/;

            if (file.type.match(textType)) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    that.fileInput.value = "";
                    that.content = reader.result;
                    that.setTable();
                    if(callback){
                        callback(that.tableContent);
                    }
                }

                reader.readAsText(file);
            } else {
                Plugins.Mensagem.erro("Tipo de arquivo inválido");
            }
        }
        that.setTable = function(){
            Controle.Loading.start();
            var rows = that.content.split('\n');
            that.rows = rows.length;
            for(var i = 0; i < that.rows; i++){
                rows[i] = rows[i].split(',');
            }
            that.cols = rows[0].length;
            that.tableContent = rows;
            that.insertDB();
            Controle.Loading.stop();
        }
        that.insertDB = function(){
            var table = that.tableContent.slice(0);
            fields = table.splice(0,1)[0],
            values = table,
            finalObjs = [],
            totalRows = values.length,
            totalCols = fields.length;
            while(totalRows--){
                var obj = '{';
                var col = totalCols;
                while(col--){
                    obj += '"' + fields[col] + '":"' + ( values[totalRows][col] ? values[totalRows][col] : "" ).replace(/"/gi,"").trim() + '",'
                }
                obj = obj.substring(0, obj.length-1) + '}';
                try {
                    finalObjs.push(JSON.parse(obj));
                }catch(e){
                    console.log(totalRows, col-1, values[totalRows][col-1]);
                }
            }
            DB[that.table].clear(function(err,resp){console.log(err,resp)});
            DB[that.table].insert(finalObjs, function(err,resp){console.log(err,resp)});
            return finalObjs;
        }
        fileInput.addEventListener('change', that.read);
    }
    return reader;
}]);