var monq = require('monq');
var request = require("request");
var client = monq('mongodb://rishravi:massdrop@ds025802.mlab.com:25802/heroku_6xqhdnbn');
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


var jobID = {};

function createJob(myURL) {
    return new Promise(function (resolve, reject){
    queue.enqueue('getHTML', {
        url: myURL
    }, function(err, job) {
       resolve(job.data);       
        //create 
    });

    worker.start();

    worker.on('dequeued', function(data) {

    });
    worker.on('failed', function(data) {
        // console.log('FAILED: ');
        // console.log(data);
    });
    worker.on('complete', function(data) {
        // console.log('COMPLETE: ');
        // console.log(data);

        // var jobData = {
        //     url: data.params.url,
        //     result: data.result,
        //     status: data.status,
        //     message: 'Job completed'
        // };

        // //use schema's create method
        // Job.create(jobData, function(error, job) {
        //     if (error) {
        //         console.log(error);
        //     }
        // });
    });
    worker.on('error', function(err) {
        reject(err);
        // console.log('ERROR: ')
        // console.log(err)
        worker.stop()
    });
    return jobID;
    });
}

module.exports.createJob = createJob;

