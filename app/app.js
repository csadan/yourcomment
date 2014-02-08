
/**
 * Module dependencies.
 */

var express = require('express'),
	http = require('http'), 
	path = require('path'),
	config = require('./config')(),
	app = express(),
	MongoClient = require('mongodb').MongoClient,
	Home = require('./controllers/Home'),
	NewUser = require('./controllers/newuser'),
	Login = require('./controllers/Login'),
	Logout = require('./controllers/logout'),
	SendPost = require('./controllers/SendPost'),					
	Register = require('./controllers/Register'),
	Friends = require('./controllers/friends'),
	FindUsers = require('./controllers/findUsers'),
	MyFriends = require('./controllers/myfriends'),
	ViewFriend = require('./controllers/viewFriend'),
	addFriend = require('./controllers/addFriend'),
	PoblarBBDD = require('./controllers/PoblarBBDD'),
	TextEditor = require('./controllers/TextEditor');
;

// all environments
// app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/templates');
app.set('view engine', 'hjs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('yourcomment'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  	app.use(express.errorHandler());
}

MongoClient.connect('mongodb://' + config.mongo.host + ':' + config.mongo.port + '/yourcoment', function(err, db) {
	if(err) {
		console.log('Sorry, there is no mongo db server running.');
	} else {
		var attachDB = function(req, res, next) {
			req.db = db;
			next();
		};

		//inicio y cierre de sesión
		app.all('/login', attachDB, function(req, res, next) {
			Login.run(req, res, next);
		});
		app.all('/logout', attachDB, function(req, res, next) {
			Logout.run(req, res, next);
		});

		//controlador de página de inicio
		app.all('/', attachDB, function(req, res, next) {
			if(req.session && req.session.yourcomment && req.session.yourcomment === true){
				res.redirect('/home');			}
			else{
				Login.run(req, res, next);
			}
		});
		app.all('/home', attachDB, function(req, res, next) {
			if(req.session && req.session.yourcomment && req.session.yourcomment === true){
				Home.run(req, res, next);
			}else{
				res.redirect('/login');	
			}
		});

		//registrar un nuevo usuario
		app.all('/register', attachDB, function(req, res, next) {
			Register.run(req, res, next);
		});
		app.all('/newuser', attachDB, function(req, res, next) {
			NewUser.run(req, res, next);
		});		


		//crear un nuevo post
		app.all('/textEditor', attachDB, function(req, res, next) {
			if(req.session && req.session.yourcomment && req.session.yourcomment === true) TextEditor.run(req,res,next);
		});	

		app.all('/sendpost', attachDB, function(req, res, next) {
			SendPost.run(req, res, next);
		});


		//controladores relacionado con los amigos

		//controlador para la busqueda con AJAX
		app.all('/findusers', attachDB, function(req, res, next) {
			FindUsers.run(req,res,next);
		});	
		app.all('/friends', attachDB, function(req, res, next) {
			if(req.session && req.session.yourcomment && req.session.yourcomment === true){
				Friends.run(req, res, next);
			}else{
				res.redirect('/login');	
			}
		});			
		app.all('/addFriend', attachDB, function(req, res, next) {
			if(req.session && req.session.yourcomment && req.session.yourcomment === true){
				addFriend.run(req,res,next);
			}else{
				res.redirect('/login');	
			}
		});	

		app.all('/myfriends', attachDB, function(req, res, next) {
			if(req.session && req.session.yourcomment && req.session.yourcomment === true){
				MyFriends.run(req, res, next);
			}else{
				res.redirect('/login');	
			}
		});
		app.all('/viewFriend', attachDB, function(req, res, next) {
			if(req.session && req.session.yourcomment && req.session.yourcomment === true){
				ViewFriend.run(req,res,next);
			}else{
				res.redirect('/login');	
			}
		});		







		app.all('/poblarBBDD', attachDB, function(req, res, next) {
			PoblarBBDD.run(req,res,next);
		});	


		http.createServer(app).listen(config.port, function() {
		  	console.log(
		  		'Successfully connected to mongodb://' + config.mongo.host + ':' + config.mongo.port,
		  		'\nExpress server listening on port ' + config.port
		  	);
		});
	}
});