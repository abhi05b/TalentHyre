'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * JobCandidateScore Schema
 */
var JobCandidateStatusSchema = new Schema({
	candidate: {
	    type: Schema.Types.ObjectId,
	    ref: 'Candidate'
	  },
	  job: {
	    type: Schema.Types.ObjectId,
	    ref: 'Job'
	  },
	  status: {
	    type: String
	  },
	  date : {
	  	type : Date,
	  	default : Date.now()
	  }

});

mongoose.model('JobCandidateStatus', JobCandidateStatusSchema);
