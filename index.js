// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db


module.exports.mongoConnect = function mongoConnect(){
	MongoClient.connect("mongodb://localhost:27017/mydb", function(err, db) {
  		if(!err) {
  			console.log("conectado correctamente a la base de datos");
  			MongoClient.peticion = db.collection('peticion');
	 	}
	 	else{
	 		console.log("no se ha conectado")
	 	}
	});
}


module.exports.saveClient = function saveClient(email,psw){
	MongoClient.peticion.save( {_id:email, pass:psw} , saveClientCallback );
	console.log("nuevo cliente introducido");
}
function saveClientCallback(err,items){
  		if(!err) {
  			console.log("Usuario introducido correctamente");
	 	}
}


module.exports.findClient = function findClient(objFind){
		peticiones= MongoClient.peticion.find(objFind,findCallback)
}
function findCallback(err,items){
	items.toArray(function(err, items) {
								if(err || !items){console.log(err)}
								else{items.forEach(function(item){console.log(item);})}	
					  });
}
