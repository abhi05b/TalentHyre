'use strict';
var path = require('path'),
mongoose = require('mongoose'),
  Job = mongoose.model('Job'),
  Candidate = mongoose.model('Candidate'),
  JobCandidateScore = mongoose.model('JobCandidateScore'),
  recommendationService = require(path.resolve('./modules/core/server/services/recommendation.server.service'));

exports.createCandidateScoreForJob = function(job){
	var jobSkills = job.skills;
	return Candidate.find({}).exec(function(err, candidates){
		if(candidates){
				candidates.forEach(function(candidate){
				var score = recommendationService.skillScore(job, candidate);
				var jobCandidateScore = new JobCandidateScore({
					candidate: candidate._id,
					job: job._id,
					score: score
				});
				jobCandidateScore.save(function (err){
					if(err){
						console.log(err);
					}
				});
			});
		}

	});
};

exports.createCandidateScoreForCandidate = function(candidate){

	var candidateSkills = candidate.skills;
	return Job.find().exec(function(err, jobs){
    if(jobs){
		jobs.forEach(function(job){
			var jobSkills = job.skills;
			var score = recommendationService.skillScore(job, candidate);
			var jobCandidateScore = new JobCandidateScore({
				candidate: candidate._id,
				job: job._id,
				score: score
			});
			jobCandidateScore.save(function (err){
				if(err){
					console.log(err);
				}
			});
		});
  }
	});
};

function deleteRows(candidate){
	JobCandidateScore.find({ 'candidate.id': candidate._id }).remove().exec();
}
