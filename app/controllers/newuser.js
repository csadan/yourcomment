/*
controlador para insertar un nuevo usuario, recoge las peticiones GET y POST
recurso: /login
vista: admin-register.hjs
*/
var BaseController = require("./Base"),
	View = require("../views/Base"),
	model = new (require("../models/ContentModel"));

module.exports = BaseController.extend({ 
	name: "newuser",
	run: function(req, res, next) {
		model.setDB(req.db);
		var self = this;
		var usr= req.body.username;
		var mail=req.body.email;
		var psw=req.body.password;
		model.getlist(function(err, records) {
			if(records.length === 0) {
				model.insert({username:usr,email:mail,password:psw,contenido:[],friends:[]},
					function(err,data){
								if (!err) {
									res.redirect("/login");
								}else{
									console.log("error al insertar usuario premo")
								}
					});
			}else {
				var v = new View(res, 'admin-register');
				v.render({
					title:'Please register',
				});
			}
		}, {$or: [{ username:usr},{"email" : mail}]});		
	}
});