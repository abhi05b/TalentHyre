'use strict';

/**
 * Module dependencies
 */
var candidatesPolicy = require('../policies/candidates.server.policy'),
  candidates = require('../controllers/candidates.server.controller'),
  jobCandidateStatus = require('../services/jobCandidateStatus.server.service');

module.exports = function(app) {
  // Candidates Routes
  app.route('/api/candidates').all(candidatesPolicy.isAllowed)
    .get(candidates.list)
    .post(candidates.create);

  app.route('/api/candidates/:candidateId').all(candidatesPolicy.isAllowed)
    .get(candidates.read)
    .put(candidates.update)
    .delete(candidates.delete);

  app.route('/api/retriveJobsForCandidate/:candidateId').all(candidatesPolicy.isAllowed)
    .get(jobCandidateStatus.retriveJobsForCandidate);

  app.route('/api/retriveCandidatesForJob/:jobId/').all(candidatesPolicy.isAllowed)
    .get(jobCandidateStatus.retriveCandidatesForJob);

  app.route('/api/updateCandidateStatus/:candidateId/:jobId').all(candidatesPolicy.isAllowed)
    .post(jobCandidateStatus.updateCandidateStatus);

  app.route('/api/getCandidateStatus/:candidateId/:jobId').all(candidatesPolicy.isAllowed)
    .get(jobCandidateStatus.getCandidateStatus);

  // Finish by binding the Candidate middleware
  app.param('candidateId', candidates.candidateByID);
};
