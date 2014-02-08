var BaseController = require("./Base"),
	View = require("../views/Base"),
	model = new (require("../models/ContentModel"));

module.exports = BaseController.extend({ 
	name: "logout",
	content: null,
	run: function(req, res, next) {
		model.setDB(req.db);
		var self = this;
		if( req.session && req.session.yourcomment && req.session.yourcomment === true){
				req.session.destroy()
		}
		res.redirect('/login')
	}
});