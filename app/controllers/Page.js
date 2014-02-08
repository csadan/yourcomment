var BaseController = require("./Base"),
	View = require("../views/Base"),
	model = new (require("../models/ContentModel"));

module.exports = BaseController.extend({ 
	name: "TextEditor",
	run: function(type, req, res, next) {
		model.setDB(req.db);
		var self = this;
		var v = new View(res, 'inner');
		v.render(self.content);
	}
});