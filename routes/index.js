var express = require('express');
var router = express.Router();

//GET for index
router.get('/', function(req,res,next) {
	res.render('index', { title: 'Home'});
});
