var monq = require('monq');
var request = require("request");
var client = monq('mongodb://localhost:27017/monq_example');
var queue = client.queue('example');
var Job = require('../models/jobs')

var worker = client.worker(['example']);

worker.register({
    getHTML: function(params, callback) {
        try {
            request({
                uri: params.url,
            }, function(error, response, body) {
                callback(null, body);
            });

        } catch (err) {
            callback(err);
        }
    }
});


var jobID;

function createJob(myURL) {
    queue.enqueue('getHTML', {
        url: myURL
    }, function(err, job) {
        console.log('ENQUEUED:', job.data);
        //create 
    });

    worker.start();

    worker.on('dequeued', function(data) {
        console.log('DEQUEUED: ');
        console.log(data);

        // // Job.findByIdAndUpdate(jobID, {$set: {
        // // 	message: 'out of queue'
        // // 	}},
        // // 	 function() { console.log('ainvy')});
        // // Job.update({_id:jobID}, 
        // // {	
        // // 	message: 'out of queue',
        // // 	status: 'dequeued'
        // // }, function(err) {
        // // 	 console.log("Kuch toh ho raha hain");
        // // });
        // Job.findById(jobID, function(err, job) {
        //     console.log("in findById", jobID);
        //     if (err) {
        //         console.log(err.message);
        //     } else {
        //         job.message = 'job has been taken out of queue';
        //         job.status = data.status;
        //         job.save(function(err, job) {
        //             console.log("ho");
        //         });
        //     }
        // });
    });
    worker.on('failed', function(data) {
        console.log('FAILED: ');
        console.log(data);
    });
    worker.on('complete', function(data) {
        console.log('COMPLETE: ');
        console.log(data);

        var jobData = {
            url: data.params.url,
            result: data.result,
            status: data.status,
            message: 'Job completed'
        };

        //use schema's create method
        Job.create(jobData, function(error, job) {
            if (error) {
                console.log(error);
            }
        });
    });
    worker.on('error', function(err) {
        console.log('ERROR: ')
        console.log(err)
        worker.stop()
    });
}

module.exports.createJob = createJob;