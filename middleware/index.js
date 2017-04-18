var re = /^[0-9a-fA-F]{24}$/;

module.exports.isValid = function(req,res,next) {
	var   jobID = req.body.jobID;
  if(jobID && ('string' !== typeof jobID) && jobID.toString)
	{    jobID = jobID.toString(); }

  if ( jobID && re.test(jobID)) {
  	return next();
  }
  else {
  	var err = new Error("String is not a valid object id type. Please enter a valid search id.");
		err.status = 401;
		return next(err);
  }
};