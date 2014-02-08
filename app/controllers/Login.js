/*
controlador para el login, recoge las peticiones GET y POST
recurso: /login
vista: Login.hjs
*/
var BaseController = require("./Base"),
	View = require("../views/Base"),
	model = new (require("../models/ContentModel"));

module.exports = BaseController.extend({ 
	name: "login",
	content: null,
	run: function(req, res, next) {
		model.setDB(req.db);
		var self = this;
		var usr= req.body.username;
		var psw=req.body.password;
		if( req.session && req.session.yourcomment && req.session.yourcomment === true){
				var v = new View(res, 'home');
				v.render();
		}else{
			model.getlist(function(err, records) {
				if(records.length ===0) {
					console.log("usuario no existente")
					var v = new View(res, 'admin-login');
					v.render({
						title:'Please login'
					});
				}else {
					req.session.yourcomment= true;
					req.session.uid=records[0].email;
					req.session.save();
					res.redirect('/home')
				}
			}, {password:psw, username:usr});
		}
	}
});