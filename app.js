var monq = require('monq');
var request =  require("request");
var client = monq('mongodb://localhost:27017/monq_example');

var queue = client.queue('example');
 
queue.enqueue('reverse', { text: 'http://www.google.com' }, function (err, job) {
    console.log('ENQUEUED:', job.data);
});

var worker = client.worker(['example']);

worker.register({
    reverse: function (params, callback) {
        try {
        	var htmlCode = '';
            request({
			  uri: params.text,
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