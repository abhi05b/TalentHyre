'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Test = mongoose.model('Test'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  JobCandidateStatus = mongoose.model('JobCandidateStatus'),
  Candidate = mongoose.model('Candidate'),
  _ = require('lodash');

/**
 * Create a Test
 */
exports.create = function(req, res) {
  var test = new Test(req.body);
  test.user = req.user;

  test.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(test);
    }
  });
};

/**
 * Show the current Test
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var test = req.test ? req.test.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  test.isCurrentUserOwner = req.user && test.user && test.user._id.toString() === req.user._id.toString();

  res.jsonp(test);
};

/**
 * Update a Test
 */
exports.update = function(req, res) {

  var test = req.test;
  var correctAnswerCount=0;
  var score=0;
  for(var i=0;i<test.testQuestions.length;i++){
    var question = test.testQuestions[i];


    if(question.candidateAnswer == question.answer){
      correctAnswerCount++;
    }
    score = Math.trunc((correctAnswerCount/test.testQuestions.length)*100);
  }
  test = _.extend(test, req.body);

  test.score =score;
  test.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      var socketio = req.app.get('socketio');
      socketio.sockets.emit('testCompleted', req.test);
      Candidate.findOne({'emailId' : req.user.email}).exec(function(err,candidate){
          JobCandidateStatus.findOne({'candidate' : candidate,'job' : req.body.job}).exec(function(err, jobCandidateStatus){
            jobCandidateStatus.status = 'Test Completed';
               jobCandidateStatus.save(function (err){
              if(err){
                console.log(err);
              }
            });
          });
        res.jsonp(test);
      });

    }
  });
};

/**
 * Delete an Test
 */
exports.delete = function(req, res) {
  var test = req.test;

  test.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(test);
    }
  });
};

/**
 * List of Tests
 */
exports.list = function(req, res) {
  Test.find().sort('-created').populate('user').exec(function(err, tests) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(tests);
    }
  });
};

/**
 * Test middleware
 */
exports.testByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Test is invalid'
    });
  }

  Test.findById(id).populate('user' , 'displayName').populate('job').exec(function (err, test) {
    if (err) {
      return next(err);
    } else if (!test) {
      return res.status(404).send({
        message: 'No Test with that identifier has been found'
      });
    }
    req.test = test;
    next();
  });
};
