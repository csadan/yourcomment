/*
controlador para la creación de una ventana que nos ofrezca crear un Post, recoge las peticiones GET y POST
recurso: /textEditor
vista: textEditor.hjs
*/
var BaseController = require("./Base"),
	View = require("../views/Base"),
	model = new (require("../models/ContentModel"));

module.exports = BaseController.extend({ 
	name: "TextEditor",
	run: function(req, res, next) {
		model.setDB(req.db);
		var v = new View(res, 'textEditor');
		v.render({
			title:'Nuevo Comentario',
		});
	}
});