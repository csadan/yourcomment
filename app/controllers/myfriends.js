
/*
controlador que recoge la petición de ver mis amigos, peticiones GET y POST
recurso: /myfriends
vista: myfriends.hjs
*/

var BaseController = require("./Base"),
	View = require("../views/Base"),
	model = new (require("../models/ContentModel"));

module.exports = BaseController.extend({ 
	name: "Home",
	content: null,
	run: function(req, res, next) {
		model.setDB(req.db);
		var self = this;
		this.uid=req.session.uid;
		this.getContent(function() {
			var v = new View(res, 'myFriends');
			v.render(self.content);
		})
	},
	getContent: function(callback) {
		var self = this;
		this.content = {};
		model.getlist(function(err, records) {
			var blogArticles = '';
			if(records.length === 1) {
					for (var i = records[0].friends.length - 1; i >= 0; i--) {
						blogArticles =blogArticles+ '\
										<form class="usr" style="margin-bottom:5%" onsubmit="javascript:void(0);" action="/viewFriend" method="POST">\
											<img src="images/usuario.png" height="70" width="70" style="float:left;margin-right=3%"></img>\
											<div style="margin-left: 10%;">'+records[0].friends[i].userName+'</br>\
											<input type="hidden" name="userName" value='+records[0].friends[i].userName+'></input>\
											<button type="submit" value="Add friend">View Friend</button>\
											</div>\
										</form>'
					};	
			}
			self.content.blogArticles = blogArticles;
			callback();
		},{email:self.uid});
	}
});