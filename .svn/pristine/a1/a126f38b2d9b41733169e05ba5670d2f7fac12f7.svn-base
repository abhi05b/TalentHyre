'use strict';
var path = require('path'),
mongoose = require('mongoose'),
  Job = mongoose.model('Job'),
  Candidate = mongoose.model('Candidate'),
  JobCandidateStatus = mongoose.model('JobCandidateStatus');

exports.updateCandidateStatus = function(req, res){	
	
	 JobCandidateStatus.findOne({'candidate' : req.candidate,'job' : req.job}).exec(function(err, jobCandidateStatus){
	 	if(err)
	 	console.log("Errorr!!!!!!", err);
		if(jobCandidateStatus){				
			jobCandidateStatus.status = req.body.status;
			jobCandidateStatus.save(function (err){
				if(err){
					console.log(err);
				}else{
					res.jsonp("Status Updated");
				}
			});
		}else{
			console.log("updateCandidateStatus ");
			var jobCandidateStatus = new JobCandidateStatus({
					candidate: req.candidate._id,
					job: req.job._id,
					status: req.body.status
			});
			jobCandidateStatus.save(function (err){
				if(err){
					console.log('jobCandidateStatus', err);
				}
				else{
					res.jsonp("Status Added");
				}
			});
		}		
	});

};

exports.retriveJobsForCandidate = function(req, res){

	var jobCandidateStatusList = [];
	JobCandidateStatus.find({'candidate' : req.candidate})
	.populate('job')
	.exec(function(err, jobCandidateStatus){		
		if(err){
			console.log(err);
		}else{
			if(jobCandidateStatus){
				res.jsonp(jobCandidateStatus)		
			}
		}		
	});
	
};


exports.retriveCandidatesForJob = function(req, res){

	var jobCandidateStatusList = [];
	JobCandidateStatus.find({'job' : req.job})
	.populate('candidate')
	.exec(function(err, jobCandidateStatus){		
		if(err){
			console.log(err);
		}else{
			if(jobCandidateStatus){
				res.jsonp(jobCandidateStatus)
				}				
			}		
	});
	
};


exports.getCandidateStatus = function(req, res){
	
	JobCandidateStatus.findOne({'candidate' : req.candidate,'job' : req.job}).exec(function(err, jobCandidateStatus){
	 	if(err)
	 	console.log("Errorr!!!!!!", err);
	 	res.jsonp(jobCandidateStatus);
	});	

};




