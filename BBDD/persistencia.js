// Retrieve
var MongoClient = require('mongodb').MongoClient;
module.exports.mongoClient = MongoClient;

/*
#############################################################################################
#############################################################################################
#############################################################################################
*/

module.exports.findClients= function allClients(params){
	MongoClient.connect("mongodb://localhost:27017/mydb", function(err,db){
		if(!err) {
  			console.log("conectado correctamente a la base de datos");
  			MongoClient.peticion = db.collection('peticion');
			MongoClient.peticion.find(params,findCallback)	 	}
	 	else{
	 		console.log("fallo en la conexión allClients")
	 	}
	});
}
function findCallback(err,items){
	items.toArray(function(err, items) {
								if(err || !items){console.log(err)}
								else{items.forEach(function(item){console.log(item);})}	
				});
}

/*
#############################################################################################
#############################################################################################
#############################################################################################
*/
module.exports.saveClient= function saveClient(client){
	MongoClient.connect("mongodb://localhost:27017/mydb", function(err,db){
		if(!err) {
  			console.log("conectado correctamente a la base de datos");
  			MongoClient.peticion = db.collection('peticion');
			MongoClient.peticion.save(client,function(err,items){
						//console.log(items);
						db.close();
			});
		}
	 	else{
	 		console.log("fallo en la conexión save")
	 	}
	});
}
