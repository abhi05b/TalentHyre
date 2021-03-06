'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Candidate = mongoose.model('Candidate'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  jobCandidateScore = require(path.resolve('./modules/hrs/server/services/jobCandidateScore.server.service')),
  _ = require('lodash');

/**
 * Create a Candidate
 */
 exports.create = function(req, candidateProfile) {
  Candidate.findOne({ 'emailId': candidateProfile.emailId }, function (err, person) {
    if (err){
      console.log(err);
      return;  
    } 

    if(!person){
      var candidate = new Candidate(candidateProfile);
      candidate.user = req.user;
      candidate.save(function(err) {
        if (err) {
          console.log(err);
        }
      });

      jobCandidateScore.createCandidateScoreForCandidate(candidate);
    }
    else{
      req.candidate = person;
      req.body = candidateProfile;
      exports.update(req,candidateProfile);
    }
  })  
};

/**
 * Show the current Candidate
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var candidate = req.candidate ? req.candidate.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  candidate.isCurrentUserOwner = req.user && candidate.user && candidate.user._id.toString() === req.user._id.toString();

  res.jsonp(candidate);
};

/**
 * Update a Candidate
 */
exports.update = function(req, res) {
  var candidate = req.candidate;

  candidate = _.extend(candidate, req.body);

  candidate.save(function(err) {
    if (err) {
      console.log("update candidate", err);
    } else {
     /* return res.status(200).send({
        message: "Updated"
      });*/
    }
  });
};

/**
 * Delete an Candidate
 */
exports.delete = function(req, res) {
  var candidate = req.candidate;

  candidate.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(candidate);
    }
  });
};

/**
 * List of Candidates
 */
exports.list = function(req, res) {
  Candidate.find().sort('-created').populate('user', 'displayName').exec(function(err, candidates) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(candidates);
    }
  });
};

/**
 * Candidate middleware
 */
exports.candidateByID = function(req, res, next, id) {

  console.log('Candidate By Id');
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Candidate is invalid'
    });
  }

  Candidate.findById(id).populate('user', 'displayName').exec(function (err, candidate) {
    if (err) {
      return next(err);
    } else if (!candidate) {
      return res.status(404).send({
        message: 'No Candidate with that identifier has been found'
      });
    }
    req.candidate = candidate;
    next();
  });
};
