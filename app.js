var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

//mongodb connection
mongoose.connect("mongodb://rishravi:massdrop@ds025802.mlab.com:25802/heroku_6xqhdnbn");


var db = mongoose.connection;

//mongo error handler
db.on('error', console.error.bind(console, 'connection error:'));
// use sessions for tracking logins
app.use(session( {
  secret: 'M@ssdrop',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore ({
  	mongooseConnection: db
  })
}))

// make user ID available in all templates 
app.use(function(req, res, next) {
		res.locals.currentUser = req.session.userId;
		next();
	})
// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// link static files from dirname to public
app.use(express.static(__dirname + '/public'));

//pug engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

//include routes from route
var routes = require('./controllers/index');
app.use('/', routes);

//handle status 404 page not found
app.use(function(req, res, next) {
	var err = new Error('Page not found');
	err.status = 404;
	next(err);
});

//error handler
//define last callback
app.use(function(err, req,res,next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
}); 

//listen to port 5000 and send message to console
app.listen(process.env.PORT || 5000, function() {
	console.log('Express app started at port')
});