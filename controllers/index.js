var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mid = require('../middleware');
var jobController  = require('../controllers/jobsController');

router.get('/input', function(req,res,next) {

	return res.render('input', {title: 'Get URL'});
});

router.get('/geturl/:link', function(req,res,next) {
	
	return res.render('input', {title: 'Get URL'});
});

router.post('/input', function(req, res, next) {
	if(req.body.link) {
		//pass the job to worker to do the job and store it in the database
		jobController.createJob(req.body.link)
			.then(function(data) {
			return res.render('result', {link:data.params.url, jobID: data._id});
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

//GET for index
router.get('/', function(req,res,next) {
	res.render('index', { title: 'Home'});
});

module.exports = router;
