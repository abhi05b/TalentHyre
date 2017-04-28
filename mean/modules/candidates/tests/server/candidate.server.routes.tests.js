'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Candidate = mongoose.model('Candidate'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  candidate;

/**
 * Candidate routes tests
 */
describe('Candidate CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Candidate
    user.save(function () {
      candidate = {
        name: 'Candidate name'
      };

      done();
    });
  });

  it('should be able to save a Candidate if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Candidate
        agent.post('/api/candidates')
          .send(candidate)
          .expect(200)
          .end(function (candidateSaveErr, candidateSaveRes) {
            // Handle Candidate save error
            if (candidateSaveErr) {
              return done(candidateSaveErr);
            }

            // Get a list of Candidates
            agent.get('/api/candidates')
              .end(function (candidatesGetErr, candidatesGetRes) {
                // Handle Candidates save error
                if (candidatesGetErr) {
                  return done(candidatesGetErr);
                }

                // Get Candidates list
                var candidates = candidatesGetRes.body;

                // Set assertions
                (candidates[0].user._id).should.equal(userId);
                (candidates[0].name).should.match('Candidate name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Candidate if not logged in', function (done) {
    agent.post('/api/candidates')
      .send(candidate)
      .expect(403)
      .end(function (candidateSaveErr, candidateSaveRes) {
        // Call the assertion callback
        done(candidateSaveErr);
      });
  });

  it('should not be able to save an Candidate if no name is provided', function (done) {
    // Invalidate name field
    candidate.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Candidate
        agent.post('/api/candidates')
          .send(candidate)
          .expect(400)
          .end(function (candidateSaveErr, candidateSaveRes) {
            // Set message assertion
            (candidateSaveRes.body.message).should.match('Please fill Candidate name');

            // Handle Candidate save error
            done(candidateSaveErr);
          });
      });
  });

  it('should be able to update an Candidate if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Candidate
        agent.post('/api/candidates')
          .send(candidate)
          .expect(200)
          .end(function (candidateSaveErr, candidateSaveRes) {
            // Handle Candidate save error
            if (candidateSaveErr) {
              return done(candidateSaveErr);
            }

            // Update Candidate name
            candidate.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Candidate
            agent.put('/api/candidates/' + candidateSaveRes.body._id)
              .send(candidate)
              .expect(200)
              .end(function (candidateUpdateErr, candidateUpdateRes) {
                // Handle Candidate update error
                if (candidateUpdateErr) {
                  return done(candidateUpdateErr);
                }

                // Set assertions
                (candidateUpdateRes.body._id).should.equal(candidateSaveRes.body._id);
                (candidateUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Candidates if not signed in', function (done) {
    // Create new Candidate model instance
    var candidateObj = new Candidate(candidate);

    // Save the candidate
    candidateObj.save(function () {
      // Request Candidates
      request(app).get('/api/candidates')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Candidate if not signed in', function (done) {
    // Create new Candidate model instance
    var candidateObj = new Candidate(candidate);

    // Save the Candidate
    candidateObj.save(function () {
      request(app).get('/api/candidates/' + candidateObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', candidate.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Candidate with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/candidates/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Candidate is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Candidate which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Candidate
    request(app).get('/api/candidates/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Candidate with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Candidate if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Candidate
        agent.post('/api/candidates')
          .send(candidate)
          .expect(200)
          .end(function (candidateSaveErr, candidateSaveRes) {
            // Handle Candidate save error
            if (candidateSaveErr) {
              return done(candidateSaveErr);
            }

            // Delete an existing Candidate
            agent.delete('/api/candidates/' + candidateSaveRes.body._id)
              .send(candidate)
              .expect(200)
              .end(function (candidateDeleteErr, candidateDeleteRes) {
                // Handle candidate error error
                if (candidateDeleteErr) {
                  return done(candidateDeleteErr);
                }

                // Set assertions
                (candidateDeleteRes.body._id).should.equal(candidateSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Candidate if not signed in', function (done) {
    // Set Candidate user
    candidate.user = user;

    // Create new Candidate model instance
    var candidateObj = new Candidate(candidate);

    // Save the Candidate
    candidateObj.save(function () {
      // Try deleting Candidate
      request(app).delete('/api/candidates/' + candidateObj._id)
        .expect(403)
        .end(function (candidateDeleteErr, candidateDeleteRes) {
          // Set message assertion
          (candidateDeleteRes.body.message).should.match('User is not authorized');

          // Handle Candidate error error
          done(candidateDeleteErr);
        });

    });
  });

  it('should be able to get a single Candidate that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Candidate
          agent.post('/api/candidates')
            .send(candidate)
            .expect(200)
            .end(function (candidateSaveErr, candidateSaveRes) {
              // Handle Candidate save error
              if (candidateSaveErr) {
                return done(candidateSaveErr);
              }

              // Set assertions on new Candidate
              (candidateSaveRes.body.name).should.equal(candidate.name);
              should.exist(candidateSaveRes.body.user);
              should.equal(candidateSaveRes.body.user._id, orphanId);

              // force the Candidate to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Candidate
                    agent.get('/api/candidates/' + candidateSaveRes.body._id)
                      .expect(200)
                      .end(function (candidateInfoErr, candidateInfoRes) {
                        // Handle Candidate error
                        if (candidateInfoErr) {
                          return done(candidateInfoErr);
                        }

                        // Set assertions
                        (candidateInfoRes.body._id).should.equal(candidateSaveRes.body._id);
                        (candidateInfoRes.body.name).should.equal(candidate.name);
                        should.equal(candidateInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Candidate.remove().exec(done);
    });
  });
});
