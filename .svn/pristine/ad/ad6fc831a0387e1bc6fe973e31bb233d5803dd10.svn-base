'use strict';

/**
 * Module dependencies
 */
var hrsPolicy = require('../policies/hrs.server.policy'),
  hrs = require('../controllers/hrs.server.controller');

module.exports = function(app) {
  // Hrs Routes
  app.route('/api/hrs/jobs')
    .get(hrs.jobs);

  app.route('/api/hrs/questionCount')
      .get(hrs.questionCount);

  app.route('/api/hrs/candidateCount')
        .get(hrs.candidateCount);

  app.route('/api/hrs/candidates')
  	.get(hrs.candidatesForJob);

  app.route('/api/hrs/jobCandidateStatus')
  	.get(hrs.jobsForCandidate);

  app.route('/hr/*')
    .get(hrs.renderHrIndex);

};
