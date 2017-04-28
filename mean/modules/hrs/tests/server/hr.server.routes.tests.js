'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Hr = mongoose.model('Hr'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  hr;

/**
 * Hr routes tests
 */
describe('Hr CRUD tests', function () {

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

    // Save a user to the test db and create new Hr
    user.save(function () {
      hr = {
        name: 'Hr name'
      };

      done();
    });
  });

  it('should be able to save a Hr if logged in', function (done) {
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

        // Save a new Hr
        agent.post('/api/hrs')
          .send(hr)
          .expect(200)
          .end(function (hrSaveErr, hrSaveRes) {
            // Handle Hr save error
            if (hrSaveErr) {
              return done(hrSaveErr);
            }

            // Get a list of Hrs
            agent.get('/api/hrs')
              .end(function (hrsGetErr, hrsGetRes) {
                // Handle Hrs save error
                if (hrsGetErr) {
                  return done(hrsGetErr);
                }

                // Get Hrs list
                var hrs = hrsGetRes.body;

                // Set assertions
                (hrs[0].user._id).should.equal(userId);
                (hrs[0].name).should.match('Hr name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Hr if not logged in', function (done) {
    agent.post('/api/hrs')
      .send(hr)
      .expect(403)
      .end(function (hrSaveErr, hrSaveRes) {
        // Call the assertion callback
        done(hrSaveErr);
      });
  });

  it('should not be able to save an Hr if no name is provided', function (done) {
    // Invalidate name field
    hr.name = '';

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

        // Save a new Hr
        agent.post('/api/hrs')
          .send(hr)
          .expect(400)
          .end(function (hrSaveErr, hrSaveRes) {
            // Set message assertion
            (hrSaveRes.body.message).should.match('Please fill Hr name');

            // Handle Hr save error
            done(hrSaveErr);
          });
      });
  });

  it('should be able to update an Hr if signed in', function (done) {
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

        // Save a new Hr
        agent.post('/api/hrs')
          .send(hr)
          .expect(200)
          .end(function (hrSaveErr, hrSaveRes) {
            // Handle Hr save error
            if (hrSaveErr) {
              return done(hrSaveErr);
            }

            // Update Hr name
            hr.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Hr
            agent.put('/api/hrs/' + hrSaveRes.body._id)
              .send(hr)
              .expect(200)
              .end(function (hrUpdateErr, hrUpdateRes) {
                // Handle Hr update error
                if (hrUpdateErr) {
                  return done(hrUpdateErr);
                }

                // Set assertions
                (hrUpdateRes.body._id).should.equal(hrSaveRes.body._id);
                (hrUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Hrs if not signed in', function (done) {
    // Create new Hr model instance
    var hrObj = new Hr(hr);

    // Save the hr
    hrObj.save(function () {
      // Request Hrs
      request(app).get('/api/hrs')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Hr if not signed in', function (done) {
    // Create new Hr model instance
    var hrObj = new Hr(hr);

    // Save the Hr
    hrObj.save(function () {
      request(app).get('/api/hrs/' + hrObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', hr.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Hr with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/hrs/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Hr is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Hr which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Hr
    request(app).get('/api/hrs/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Hr with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Hr if signed in', function (done) {
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

        // Save a new Hr
        agent.post('/api/hrs')
          .send(hr)
          .expect(200)
          .end(function (hrSaveErr, hrSaveRes) {
            // Handle Hr save error
            if (hrSaveErr) {
              return done(hrSaveErr);
            }

            // Delete an existing Hr
            agent.delete('/api/hrs/' + hrSaveRes.body._id)
              .send(hr)
              .expect(200)
              .end(function (hrDeleteErr, hrDeleteRes) {
                // Handle hr error error
                if (hrDeleteErr) {
                  return done(hrDeleteErr);
                }

                // Set assertions
                (hrDeleteRes.body._id).should.equal(hrSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Hr if not signed in', function (done) {
    // Set Hr user
    hr.user = user;

    // Create new Hr model instance
    var hrObj = new Hr(hr);

    // Save the Hr
    hrObj.save(function () {
      // Try deleting Hr
      request(app).delete('/api/hrs/' + hrObj._id)
        .expect(403)
        .end(function (hrDeleteErr, hrDeleteRes) {
          // Set message assertion
          (hrDeleteRes.body.message).should.match('User is not authorized');

          // Handle Hr error error
          done(hrDeleteErr);
        });

    });
  });

  it('should be able to get a single Hr that has an orphaned user reference', function (done) {
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

          // Save a new Hr
          agent.post('/api/hrs')
            .send(hr)
            .expect(200)
            .end(function (hrSaveErr, hrSaveRes) {
              // Handle Hr save error
              if (hrSaveErr) {
                return done(hrSaveErr);
              }

              // Set assertions on new Hr
              (hrSaveRes.body.name).should.equal(hr.name);
              should.exist(hrSaveRes.body.user);
              should.equal(hrSaveRes.body.user._id, orphanId);

              // force the Hr to have an orphaned user reference
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

                    // Get the Hr
                    agent.get('/api/hrs/' + hrSaveRes.body._id)
                      .expect(200)
                      .end(function (hrInfoErr, hrInfoRes) {
                        // Handle Hr error
                        if (hrInfoErr) {
                          return done(hrInfoErr);
                        }

                        // Set assertions
                        (hrInfoRes.body._id).should.equal(hrSaveRes.body._id);
                        (hrInfoRes.body.name).should.equal(hr.name);
                        should.equal(hrInfoRes.body.user, undefined);

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
      Hr.remove().exec(done);
    });
  });
});
