var monq = require('monq');
var request =  require("request");
var client = monq('mongodb://localhost:27017/monq_example');
var queue = client.queue('example');


var worker = client.worker(['example']);

worker.register({
    getHTML: function (params, callback) {
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

function createJob(myURL) {
		queue.enqueue('getHTML', { url: myURL }, function (err, job) {
	    console.log('ENQUEUED:', job.data);
	});

}

 
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

module.exports.createJob = createJob;