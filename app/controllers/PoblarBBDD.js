var BaseController = require("./Base"),
	View = require("../views/Base"),
	model = new (require("../models/ContentModel"));

module.exports = BaseController.extend({ 
	name: "poblarBBDD",
	run: function(req, res, next) {
			model.setDB(req.db);
			var self = this;
			var i =0;
			for(i;i<=10000000;i++){
				model.insert({_id:'usr'+i,username:'usr'+i,email:'usr'+i+'@bot.es',password:'usr'+i,contenido:[],friends:[]},
							function(err,data){
										if (!err) {
										}else{
											console.log(err)
										}
							}
				);
			}
			res.redirect("/login")
			
		}
});


/*
db.usuarios.ensureIndex({"username":1}) 
for(var i=0;i<=5000000;i++){
    var usuario={_id:'usr'+i,username:'usr'+i,email:'usr'+i+'@bot.es',password:'usr'+i,contenido:[],friends:[]}
    db.usuarios.insert(usuario);
}

*/