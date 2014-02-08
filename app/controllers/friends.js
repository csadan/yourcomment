
/*
controlador donde se va a realizar la busqueda de usuarios, recoge las peticiones GET y POST
recurso: /friends
vista: friends.hjs
*/

var BaseController = require("./Base"),
	View = require("../views/Base"),
	model = new (require("../models/ContentModel"));

module.exports = BaseController.extend({ 
	name: "friends",
	content: null,
	run: function(req, res, next) {
		model.setDB(req.db);
		var self = this;
		this.uid=req.session.uid;
		this.getContent(function() {
			var v = new View(res, 'friends');
			v.render({});
		})
	},
	getContent: function(callback) {
		var self = this;
		this.content = {};
		model.getlist(function(err, user) {
			var blogArticles = '';
			if(user.length === 1) {
					var usuario = user[0];
					//falta introducir bien los amigos
					for (var i = usuario.contenido.length - 1; i >= 0; i--) {

					};	
			}
			self.content.blogArticles = blogArticles;
			callback();
		},{email:self.uid});
	}
});