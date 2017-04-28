'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  JobCandidateScore = mongoose.model('JobCandidateScore');

/**
 * Globals
 */
var user,
  jobCandidateScore;

/**
 * Unit tests
 */
describe('Job candidate score Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() {
      jobCandidateScore = new JobCandidateScore({
        // Add model fields
        // ...
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      return jobCandidateScore.save(function(err) {
        should.not.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    JobCandidateScore.remove().exec();
    User.remove().exec();

    done();
  });
});
