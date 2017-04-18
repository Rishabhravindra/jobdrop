var express = require('express'),
	app = express(),
	bodyParser = require('body-parser');


// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// link static files from dirname to public
app.use(express.static(__dirname + '/public'));

//pug engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

//include routes from route
var routes = require('./controllers/routes');
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

var port = process.env.PORT || 5000;

//listen to port 5000 and send message to console
app.listen(port, function() {
	console.log('Express app started at port', port)
});