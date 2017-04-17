var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mid = require('../middleware');
var jobController  = require('../controllers/jobsController');

router.get('/input', function(req,res,next) {
	return res.render('input', {title: 'Get URL'});
});


router.post('/input', function(req, res, next) {
	if(req.body.link) {
		//pass the job to worker to do the job and store it in the database
		jobController.createJob(req.body.link);
		return res.render('index', {title: 'Sample'});
	}
	else {
		var err = new Error('Please enter a URL');
		err.status = 400;
		return next(err);
	}
});

// /GET for register
router.get('/register', function(req,res,next) {
	return res.render('register', {title: 'Sign Up'});
});

// /POST for register 
router.post('/register', function(req,res,next) {
	if(req.body.email 
		&& req.body.name
		&& req.body.password 
		&& req.body.confirmPwd && req.body.chips ){
	if(req.body.password !== req.body.confirmPwd) {
				var err = new Error('Passwords ids do not match');
				err.status = 400;
				return next(err);
			}
		var skillsNeeded = req.body.chips.split(',');	

	//create object model from input
		var userData = {
			email: req.body.email,
			password: req.body.password,
			name: req.body.name,
			skillsHelp: skillsNeeded
		};
	// use schema's create mehtod
	User.create(userData, function(error, user) {
		if(error) {
			return next(error);
		}
		else {
			req.session.userId = user._id;
			return res.redirect('/profile');
		}
	});		
	}
	else {
		var err = new Error('All fields required');
		err.status = 400;
		return next(err);
	}
});

//GET logout
router.get('/logout', function(req,res,next) {
	if(req.session) {
		// delete session object
		req.session.destroy(function(err) {
			if(err) {
				return next(err);
			}
			else {
				return res.redirect('/');
			}
		});
	}
});
// /GET profile
router.get('/profile', mid.requiresLogin, function(req, res, next) {
		
	User.findById(req.session.userId).exec(function(error, user) {
		if(error) {
			return next(error);
		}
		else {
			return res.render('profile', {title: 'Profile',
										  name: user.name,
								 		  email: user.email,
								 		  tags: user.skillsHelp
								 		  });	
		}
	})
});

//GET /login
router.get('/login', mid.loggedOut, function(req,res,next) {
	return res.render('login', {title: 'Log In'});
})

//POST /login
router.post('/login', function(req,res,next) {
	if(req.body.email &&  req.body.password) {
		User.authenticate(req.body.email, req.body.password, function(error, user) {
			if(error || !user) {
				var err = new Error('Please enter correct login credentials');
				err.status = 401;
				return next(err);
			}
			else {
				req.session.userId = user._id;
				return res.redirect('/profile');
			}
		});
	}
	else {
		var err = new Error('Enter email and password');
		err.status = 401;
		return next(err);
	}
});

//GET for index
router.get('/', function(req,res,next) {
	res.render('index', { title: 'Home'});
});

module.exports = router;
