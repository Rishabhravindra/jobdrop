var mongoose = require('mongoose');

var JobSchema = new mongoose.Schema(
{
	
	url: {
		type: String,
		required: true,
		unique: true
	},
	result: {
		type: String
	},
	status: {
		type: String,
		required: true,
		'enum': ['enqueued','dequeued', 'failed', 'complete', 'error' ],
		default: 'enqueued'
	}, 
	message: {
		type: String
	} 
});

var Job = mongoose.model('Job', JobSchema);
module.exports = Job;
