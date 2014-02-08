
/*
controlador para la vision de un determinado usuario recoge las peticiones GET y POST
recurso: /viewFriend
vista: viewFriend.hjs
*/


var BaseController = require("./Base"),
	View = require("../views/Base"),
	model = new (require("../models/ContentModel"));

	var monthsAbbr=[];
 	monthsAbbr['01']='Ene'
    monthsAbbr['02']='Feb'
    monthsAbbr['03']='Mar'
    monthsAbbr['04']='Abr'
    monthsAbbr['05']='May'
    monthsAbbr['06']='Jun'
    monthsAbbr['07']='Jul'
    monthsAbbr['08']='Ago'
    monthsAbbr['09']='Sep'
    monthsAbbr['10']='Oct'
    monthsAbbr['11']='Nov'
    monthsAbbr['12']='Dic'


module.exports = BaseController.extend({ 
	name: "Home",
	content: null,
	run: function(req, res, next) {
		model.setDB(req.db);
		var self = this;
		this.usr= req.body.userName
		this.getContent(function() {
			var v = new View(res, 'viewFriend');
			v.render(self.content);
		})
	},
	getContent: function(callback) {
		var self = this;
		this.content = {};
		model.getlist(function(err, user) {
			var blogArticles = '';
			if(user.length === 1) {
					var usuario = user[0];
					for (var i = usuario.contenido.length - 1; i >= 0; i--) {
						blogArticles =blogArticles+ '\
							<article class="is-post is-post-excerpt">\
								<header>\
										<span class="byline">'+usuario.contenido[i].title+'</span>\
								</header>\
								<div class="info">\
									<div class="date">\
										<div class="month"><div></div>'+monthsAbbr[usuario.contenido[i].date.mes]+'</div>\
										<div class="day">'+usuario.contenido[i].date.dia+'</div>\
										<div class="year">'+usuario.contenido[i].date.anio+'</div>\
									</div>\
									<div>'+usuario.contenido[i].date.hour+'</div>\
								</div>\
								<p style="text-align:justify">'+usuario.contenido[i].text+'</p>\
							</article>';
					};	
			}
			self.content.blogArticles = blogArticles;
			self.content.user = self.usr;
			callback();
		},{username:self.usr});
	}
});