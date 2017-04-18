'use strict'
var express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
	mid = require('../middleware'),
	jobController  = require('../controllers/jobsController');

router.get('/add', function(req,res,next) {

	return res.render('input', {title: 'Get URL'});
});


router.post('/add', function(req, res, next) {
	if(req.body.link) {
		//pass the job to worker to do the job and store it in the database
		jobController.createJob(req.body.link)
			.then(function(data) {
			return res.render('result', {title: "Add job",link:data.params.url, jobID: data._id});
		})
		// console.log(getJobInfo);
		// return res.render('index', {title: "Test"});
	}
	else {
		var err = new Error('Please enter a URL');
		err.status = 400;
		return next(err);
	}
});
router.get('/search', function(req,res, next) {
	return res.render('search');
})
router.post('/search', function(req,res,next) {
	if(req.body.jobID) {
			jobController.searchJob(req.body.jobID).then(function(data) {
				// var json_pp = pd.json(data[0]);
				// return res.render('searchresult', {title: "Search Results", result: json_pp })
				return res.json(data);
			})
	}
	else {
		var err = new Error("Please enter a search string");
		err.status = 400;
		return next(err);
	}
})
//GET for index
router.get('/', function(req,res,next) {
	res.render('index', { title: 'Home'});
});

module.exports = router;
