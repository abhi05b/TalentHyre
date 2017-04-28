'use strict';

/**
 * Render the main application page
 */

var mongoose = require('mongoose'),
Candidate = mongoose.model('Candidate');

exports.renderIndex = function (req, res) {
  var promise = new Promise(function(resolve, reject){
    var user = req.user || null;
    if(!user){
      resolve({
        user: null,
        candidate: null
      });
    }
    else{
      Candidate.findOne({emailId : user.email}).exec(function(err, candidate){
        if(err){
          reject(err);
        }
        resolve({
          user: user,
          candidate: candidate
        });
      });
    }
  });
  promise.then(function(data){
     res.render('modules/core/server/views/index', data);
  });
 
};

/**
 * Render the server error page
 */
exports.renderServerError = function (req, res) {
  res.status(500).render('modules/core/server/views/500', {
    error: 'Oops! Something went wrong...'
  });
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function (req, res) {

  res.status(404).format({
    'text/html': function () {
      res.render('modules/core/server/views/404', {
        url: req.originalUrl
      });
    },
    'application/json': function () {
      res.json({
        error: 'Path not found'
      });
    },
    'default': function () {
      res.send('Path not found');
    }
  });
};
