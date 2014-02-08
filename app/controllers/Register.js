/*
controlador para el registro, recoge las peticiones GET y POST
recurso: /register
vista: admin-register.hjs
*/
var BaseController = require("./Base"),
	View = require("../views/Base"),
	model = new (require("../models/ContentModel"));

module.exports = BaseController.extend({ 
	name: "Register",
	content: null,
	run: function(req, res, next) {
		model.setDB(req.db);
		var self = this;
		this.newUser(function() {
			var v = new View(res, 'admin-register');
			v.render({
				title: 'Please login'
			});
		})
	},
	newUser: function(callback){
		callback();
	}
});