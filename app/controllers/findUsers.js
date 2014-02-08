/*
controlador AJAX para la busqueda de un usuario mediante patron, recoge las peticiones GET y POST
recurso: /findusers
vista: Login.hjs
*/
var BaseController = require("./Base"),
	View = require("../views/Base"),
	model = new (require("../models/ContentModel"));

module.exports = BaseController.extend({ 
	name: "findusers",
	run: function(req, res, next) {
		model.setDB(req.db);
		var self = this;
		var data= req.body.expr;
		if (data=="") {
			res.send("")
		}else{
			if( req.session && req.session.yourcomment && req.session.yourcomment === true){
					model.getlist(function(err, records) {
					if(err || records.length ===0) {
						res.send(err);
					}else {
						blogArticles=""
						var nResults = records.length>5?5:records.length;
						for (var i=0;i<nResults;i++) {
							blogArticles =blogArticles+ '\
										<form class="usr" style="margin-bottom:5%" onsubmit="javascript:void(0);" action="/addFriend" method="POST">\
											<img src="images/usuario.png" height="70" width="70" style="float:left;margin-right=3%"></img>\
											<div style="margin-left: 10%;">Usuario: '+records[i].username+'</br>\
											Email: '+records[i].email+'</br>\
											<input type="hidden" name="newFriend" value='+records[i].username+'></input>\
											<button type="submit" value="Add friend">Add friend</button>\
											</div>\
										</form>'
						};
						res.send(blogArticles)	
					}
				}, {username: { $regex: data }});
			}else{
				res.redirect("/")
			}
		}
	}
});