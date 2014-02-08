var Model = require("./Base"),
	crypto = require("crypto"),
	model = new Model();
var ContentModel = model.extend({
	insert: function(data, callback) {
		data.ID = crypto.randomBytes(20).toString('hex'); 
		this.collection().insert(data, {}, callback || function(){ });
	},
	update: function(query,update,callback) {
		this.collection().update(query, update,callback);	
	},
	getlist: function(callback, query) {
		this.collection().find(query || {}).limit(5).toArray(callback);
	},
	remove: function(ID, callback) {
		this.collection().findAndModify({ID: ID}, [], {}, {remove: true}, callback);
	}
});
module.exports = ContentModel;