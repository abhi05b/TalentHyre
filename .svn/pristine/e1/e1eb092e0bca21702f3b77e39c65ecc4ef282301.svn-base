'use strict';

var mongoose = require('mongoose'),
  Job = mongoose.model('Job'),
  Candidate = mongoose.model('Candidate');

exports.sortJobsForCandidate = function(candidate){
	var candidateSkills =  candidate.skills;
	return Job.find().sort('-created').exec()
	.then(function(jobs){
		return jobs.sort(function(job1, job2){
			var job1Skills = job1.skills,
			job2Skills = job2.skills;
			return skillScore(job1, candidate) - skillScore(job2, candidate);
		});
	});
};

exports.sortCandidatesForJob = function(job){
	var jobSkills =  job.skills;
	return Candidate.find().sort('-created').exec()
	.then(function(candidates){
		return candidates.sort(function(candidate1, candidate2){
			var candidate1Skills = candidate1.skills,
			candidate2Skills = candidate2.skills;
			return skillScore(job, candidate1) - skillScore(job, candidate2);
		});
	});
}

exports.getCandidateScore = function(candidate){
	var candidateSkills =  candidate.skills;
	return Job.find().exec()
	.then(function(jobs){
		var candidateJobsScore = {};
		jobs.forEach(function(job){
			candidateJobsScore[job.name] = skillScore(job, candidate);
		});
		return candidateJobsScore;
	});
}


exports.skillScore = skillScore;

//Match skills which have same name
//
function skillScore(job , candidate){
	console.log("in skill score");
	var skillScore = 0;
	if(candidate.experience <= job.experience.max && candidate.experience >= job.experience.min){
		skillScore = 10;
	}
	var candidateSkills = candidate.skills;
	var jobSkills = job.skills;
	candidateSkills.forEach(function(candidateSkill){
		var candidateSkillName = candidateSkill.name;
		var matchingJobSkill = jobSkills.find(function(jobSkill){
			return jobSkill.name.toLowerCase() === candidateSkillName.toLowerCase();
		});
		if(matchingJobSkill){
			var score = 10;
			score += (candidateSkill.expertiseLevel - matchingJobSkill.expertise);
			skillScore += score;
		}
	});
	return skillScore;
}