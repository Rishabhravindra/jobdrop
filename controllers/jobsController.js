'use strict'
var monq = require('monq'),
    request = require("request"),
    client = monq('mongodb://rishravi:massdrop@ds025802.mlab.com:25802/heroku_6xqhdnbn'),
    queue = client.queue('getCode'),
    mongoose = require('mongoose'),
    ObjectId = require('mongodb').ObjectId; 


//connect to mongo database
mongoose.connect("mongodb://rishravi:massdrop@ds025802.mlab.com:25802/heroku_6xqhdnbn");

var connection = mongoose.connection;

// log connection status if not able to connecct to db 
connection.on('error', console.error.bind(console, 'connection error:'));

// log connection status if connected 
connection.once('open', function() {
    console.log("db connection success");
})

//search job based on user id provided
function searchJob(jobId)
{       
    return new Promise(function (resolve,reject) {

    //connect to jobs collection
    connection.db.collection("jobs", function(err, collection) {
        //assign o_id with jobID with object type
        var o_id = new ObjectId(jobId);
        //find job in connection
        collection.find({_id: o_id}).toArray(function(err, data) {
            //return data after job is complete
            resolve(data[0]);
        })
    });  
 })

}

//create job based on job url
function createJob(myURL) {
    return new Promise(function (resolve, reject){

    //initialize worker on queue getCode    
    var worker = client.worker(['getCode']);

    //assign job to worker
    worker.register({
        //define function getHTML to get the html code of requested url
        getHTML: function(params, callback) {
            try {
                //request html code from provided params.url
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

    //add job getHTML to queue
    queue.enqueue('getHTML', {
        url: myURL
    }, function(err, job) {
        if (err) return console.log(err.message);
       console.log(job.data);
       //return job data after job is completed by worker
       resolve(job.data);       
        //create 
    });

    worker.start();

    //event listeners to give status and data updates throughout the job process
    worker.on('dequeued', function(data) {
        // console.log('DEQUEUED: ');
        // console.log(data);
    });
    worker.on('failed', function(data) {
        // console.log('FAILED: ');
        // console.log(data);
    });
    worker.on('complete', function(data) {
        // console.log('COMPLETE: ');
        // console.log(data);

    });
    worker.on('error', function(err) {
        reject(err);
        // console.log('ERROR: ')
        // console.log(err)
        worker.stop()
    });
    });
}

module.exports.createJob = createJob;
module.exports.searchJob = searchJob;

