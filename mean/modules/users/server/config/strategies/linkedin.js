'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
  LinkedInStrategy = require('passport-linkedin').Strategy,
  users = require('../../controllers/users.server.controller'),
  candidates = require('../../../../candidates/server/controllers/candidates.server.controller');

module.exports = function (config) {
  // Use linkedin strategy
  passport.use(new LinkedInStrategy({
       consumerKey: '81v42g04js7w01',
      consumerSecret: 'zuNYPxJNdh8MPATd',
      callbackURL: config.linkedin.callbackURL,
      passReqToCallback: true,
      profileFields: ['id', 'first-name', 'last-name', 'email-address', 'picture-url', 'location', 'positions']
    },
    function (req, accessToken, refreshToken, profile, done) {
      // Set the provider data and include tokens
      var providerData = profile._json;
      providerData.accessToken = accessToken;
      providerData.refreshToken = refreshToken;

      // Create the user OAuth profile
      var providerUserProfile = {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        username: profile.username,
        profileImageURL: (providerData.pictureUrl) ? providerData.pictureUrl : undefined,
        provider: 'linkedin',
        providerIdentifierField: 'id',
        providerData: providerData
      };

      // Save the user OAuth profile
      users.saveOAuthUserProfile(req, providerUserProfile, done);

      //Saving Candidate Profile
     var Months = ['Jan', 'Feb', 'March', 'Apr', 'May' ,'June', 'July', 'August', 'Sept', 'Oct', 'Nov', 'Dec'],
        candidatelocation = {
          countryCode : profile._json.location.country.code,
          city : profile._json.location.name
        },
        workingSince = {
          month : Months[profile._json.positions.values[0].startDate.month-1],
          year : profile._json.positions.values[0].startDate.year
        },
        currentPosition = {
            designation : profile._json.positions.values[0].title,
            workSummary : profile._json.positions.values[0].summary,
            company : profile._json.positions.values[0].company.name,
            city : profile._json.positions.values[0].location.name,
            country : (profile._json.positions.values[0].location.country) ? profile._json.positions.values[0].location.country.name : '',
            startDate : workingSince
        },
        candidateProfile = {
          name : profile.name.givenName + ' ' +  profile.name.familyName,
          emailId : profile.emails[0].value,
          location :  candidatelocation,
          position : currentPosition,
          profileImageURL : (providerData.pictureUrl) ? providerData.pictureUrl : undefined
        };    
        candidates.create(req, candidateProfile);    
      }
  ));
};
