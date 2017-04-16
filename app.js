var monq = require('monq');
var request =  require("request");
var client = monq('mongodb://localhost:27017/monq_example');
var express = require('express');
var app = express();
var queue = client.queue('example');
var bodyParser = require('body-parser');


// link static files from dirname to public
app.use(express.static(__dirname + '/public'));

//pug engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');


// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


queue.enqueue('reverse', { url: 'http://rishravi.me/sample/sample' }, function (err, job) {
    console.log('ENQUEUED:', job.data);
});

var worker = client.worker(['example']);

worker.register({
    reverse: function (params, callback) {
        try {
            request({
			  uri: params.url,
			}, function(error, response, body) {
			  callback(null,body );
			});
            
        } catch (err) {
            callback(err);
        }
    }
});


 
worker.start();

worker.on('dequeued', function (data) { 
	console.log('DEQUEUED: ');
	console.log(data);
	 });
worker.on('failed', function (data) { 
	console.log('FAILED: ');
	console.log(data);});
worker.on('complete', function (data) { 
	console.log('COMPLETE: ');
	console.log(data);});
worker.on('error', function (err) { 
	console.log('ERROR: ')
	console.log(err)
	worker.stop()
	 });




//handle status 404 page not found
app.use(function(req, res, next) {
	var err = new Error('Page not found');
	err.status = 404;
	next(err);
});

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