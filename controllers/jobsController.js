'use strict'
var monq = require('monq');
var request = require("request");
var client = monq('mongodb://rishravi:massdrop@ds025802.mlab.com:25802/heroku_6xqhdnbn');
var queue = client.queue('example');
var Job = require('../models/jobs')
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectId; 

// db.test.find({_id:o_id})

//mongodb connection
mongoose.connect("mongodb://rishravi:massdrop@ds025802.mlab.com:25802/heroku_6xqhdnbn");

var connection = mongoose.connection;

//mongo error handler
connection.on('error', console.error.bind(console, 'connection error:'));
// use sessions for tracking logins
connection.once('open', function() {
    console.log("db connection success");
})


function searchJob(jobId)
{       
    return new Promise(function (resolve,reject) {

    connection.db.collection("jobs", function(err, collection) {
        var o_id = new ObjectId(jobId);
        collection.find({_id: o_id}).toArray(function(err, data) {
            resolve(data);
            return data;
        })
    });  
 })

}

function createJob(myURL) {
    return new Promise(function (resolve, reject){

    var worker = client.worker(['example']);

    worker.register({
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

