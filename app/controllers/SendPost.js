var BaseController = require("./Base"),
	View = require("../views/Base"),
	model = new (require("../models/ContentModel"));

module.exports = BaseController.extend({ 
	name: "sendpost",
	run: function(req, res, next) {
		model.setDB(req.db);
		var self = this;
		var comment= req.body.comment;
		var title=req.body.titl;
		this.session=req.session.uid;

	    var date = new Date();

	    var hour = date.getHours();
	    hour = (hour < 10 ? "0" : "") + hour;

	    var min  = date.getMinutes();
	    min = (min < 10 ? "0" : "") + min;

	    var year = date.getFullYear();

	    var month = date.getMonth() + 1;
	    month = (month < 10 ? "0" : "") + month;

	    var day  = date.getDate();
	    day = (day < 10 ? "0" : "") + day;

	    console.log(this.session);
		model.update({email:this.session},
					 { $push: { "contenido": {
					 							"title":title,
                                                "text":comment,
                                                "date" : {"dia" : day,"mes" : month,"anio" : year,"hour": hour+':'+min}
                                               }
                               }
                     },function(err,rtds){
						if(!err)res.redirect("/home")           
                     });	
		}
});