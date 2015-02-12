var DB = (function(){
	
	var _collections = {
		Tick : new Nedb
	};
	
	var angularObj = {
		toDB : function(obj){
			obj = JSON.stringify(obj);
			obj = obj.replace(/$$hashKey/gi,'__hashKey');
			return JSON.parse(obj);
		},
		fromDB : function(obj){
			obj = JSON.stringify(obj);
			obj = obj.replace(/__hashKey/gi,'$$hashKey');
			return JSON.parse(obj);
		}
	}
	
	var _functions = {
		insert : function(collection, obj, callback){
			obj = angularObj.toDB(obj);
			_collections[collection].insert(obj,callback);
		},
		update: function(collection, obj, callback){
			obj = angularObj.toDB(obj);
			_collections[collection].update( { _id : obj._id }, obj, callback);
		},
		del : function(collection, search, callback){
			_collections[collection].remove(search,  { multi: true }, callback)
		},
		clear : function(collection, callback){
			_collections[collection] = new Nedb();
		},
		findOne : function(collection ,search, callback){
			_collections[collection].findOne(search, function(err, resp){
				resp = angularObj.fromDB(resp);
				callback(err, resp);
			});
		},
		find : function(collection, search, callback){
			_collections[collection].find(search, function(err, resp){
				resp = angularObj.fromDB(resp);
				callback(err, resp);
			});
		},
		findAll : function(collection,callback){
			_collections[collection].find({}, function(err, resp){
				resp = angularObj.fromDB(resp);
				callback(err, resp);
			});
		}
	}
	
	var that = {
		Tick : {
			insert : function(obj   , callback){ _functions.insert('Tick',obj,callback)},
			update : function(obj   , callback){ _functions.update('Tick',obj,callback)},
			del    : function(search, callback){ _functions.del('Tick',search,callback)},
			clear  : function(callback)		   { _functions.clear('Tick',callback)},
			find   : function(search, callback){ _functions.find('Tick',search,callback)},
			findOne: function(search, callback){ _functions.findOne('Tick',search,callback)},
			findAll: function(callback)		   { _functions.findAll('Tick',callback)}
		}
	}
	
	return that;
})()