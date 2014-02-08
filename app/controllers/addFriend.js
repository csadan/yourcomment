/*
controlador aniadir un usuario a la lista de amigos de otro, recoge las peticiones GET y POST
recurso: /myFriends
vista: none
*/
var BaseController = require("./Base"),
	View = require("../views/Base"),
	model = new (require("../models/ContentModel"));

module.exports = BaseController.extend({ 
	name: "addFriend",
	run: function(req, res, next) {
			model.setDB(req.db);
			var self = this;
			var newUsr= req.body.newFriend;
			this.session=req.session.uid;

			model.update({email:this.session},
						 { $push: { 'friends': {'userName': newUsr} }},
						 function(err,rtds){
						 	if(!err){ 
						 		res.redirect("/myFriends")
							 }
	        			 }
	        );	
		}
});