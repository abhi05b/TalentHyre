'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Job = mongoose.model('Job'),
  Question = mongoose.model('Question'),
  Test = mongoose.model('Test'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash'),
  jobCandidateScoreService = require(path.resolve('./modules/hrs/server/services/jobCandidateScore.server.service'));

/**
 * Create a Job
 */
exports.create = function(req, res) {
  var job = new Job(req.body);
  job.user = req.user;
  job.save()
  .then(function(){
    return jobCandidateScoreService.createCandidateScoreForJob(job);
  })
  .then(function(){
    res.jsonp(job);
  })
  .catch(function(err){
    res.status(400).send({
        message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * Show the current Job
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var job = req.job ? req.job.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  job.isCurrentUserOwner = req.user && job.user && job.user._id.toString() === req.user._id.toString();

  res.jsonp(job);
};

/**
 * Update a Job
 */
exports.update = function(req, res) {
  var job = req.job;

  job = _.extend(job, req.body);

  job.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(job);
    }
  });
};

/**
 * Delete an Job
 */
exports.delete = function(req, res) {
  var job = req.job;

  job.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(job);
    }
  });
};

exports.createTest = function(req, res) {
  console.log('!!!!!!!!!!!inside test',req.job);
  var job = req.job;
    var promises = [];
    var testQuestions =[];
    job.skills.forEach(function(skill){
      console.log('SSSSSSSSSSSSSSSkills', skill);

      var promise = new Promise(function(resolve, reject){
          Question.find({skill: skill.name,
                         expertise: {$lt : skill.expertise + 2},
                         expertise: {$gt : skill.expertise - 2}
                       })
                       .limit(10)
                       .exec(function(err, questions){
                         console.log('EEEEEeeeeeror', err);
                         console.log('qqqqqqqqqqqquestions', questions);
                          if(err){

                            reject(err);
                          }
                          testQuestions=testQuestions.concat(questions);
                          resolve();
                      });
      });
      promises.push(promise);
    });
    Promise.all(promises).then(function(){

      // testQuestions.forEach(function(testQuestion){
      //   testQuestionObj = testQuestion.toObject();
      //   delete testQuestionObj.answer;
      // });
      console.log('ttttttttttttttttestQuestions',testQuestions);
      var testObj = {
        'testQuestions' : testQuestions,
        'user' : req.user._id,
        'job' : req.job._id
      }
      var test = new Test(testObj);
      test.save().then(function(){
        res.status(200).send(test);
      },function(error){
        res.status(400).send(error);
      });
    })
    .catch(function(err){
      res.status(400).send({
            message: errorHandler.getErrorMessage(err)
      });
    });
};

/**
 * List of Jobs
 */
exports.list = function(req, res) {
  Job.find().sort('-created').populate('user', 'displayName').exec(function(err, jobs) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(jobs);
    }
  });
};

/**
 * Job middleware
 */
exports.jobByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Job is invalid'
    });
  }

  Job.findById(id).populate('user','displayName').exec(function (err, job) {
    if (err) {
      return next(err);
    } else if (!job) {
      return res.status(404).send({
        message: 'No Job with that identifier has been found'
      });
    }
    req.job = job;
    next();
  });
};
