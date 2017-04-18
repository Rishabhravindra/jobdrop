'use strict'
var express = require('express'),
    router = express.Router(),
	jobController  = require('../controllers/jobsController'),
	mid  = require('../middleware/')

// /GET to add job
router.get('/add', function(req,res,next) {
	return res.render('input', {title: 'Get URL'});
});

// /POST for add job
router.post('/add', function(req, res, next) {
	//if-else statement to handle empty input and invalid url while adding job
	if(req.body.link) {
		//call the createJob() function in the jobs controller
		jobController.createJob(req.body.link)
			.then(function(data) {
			//render results page which gives user details about the job
			return res.render('result', {title: "Add job",link:data.params.url, jobID: data._id});
		})
	}
	else {
		//create Error object with status code 400 when empty input is entered
		var err = new Error('Please enter a valid URL');
		err.status = 400;
		return next(err);
	}
});

// /GET for search 
router.get('/search', function(req,res, next) {
	return res.render('search');
})

// /POST for search
router.post('/search', mid.isValid, function(req,res,next) {
	//if-else statement to handle empty input while searching for job
	if(req.body.jobID) {
			//call the searchJob() function in the jobs controller
			jobController.searchJob(req.body.jobID).then(function(data) {
				// return json data based on search id.
				return res.json(data);
			})
	}
	else {
		//create Error object with status code 400 when empty input is entered
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
