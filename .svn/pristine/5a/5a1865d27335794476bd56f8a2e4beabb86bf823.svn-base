'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * JobCandidateScore Schema
 */
var JobCandidateScoreSchema = new Schema({
	candidate: {
	    type: Schema.Types.ObjectId,
	    ref: 'Candidate'
	  },
	  job: {
	    type: Schema.Types.ObjectId,
	    ref: 'Job'
	  },
	  score: {
	    type: Number
	  }
});

mongoose.model('JobCandidateScore', JobCandidateScoreSchema);
