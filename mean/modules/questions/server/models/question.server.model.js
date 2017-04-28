'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Question Schema
 */
var QuestionSchema = new Schema({
  options: {
    type: Array,
    required: 'Please provide 4 Options',
    trim: true
  },
  questionText: {
    type: String,
    required: 'Please provide Question text',
    trim: true
  },
  answer: {
    type: Number,
    min: 1,
    max: 4,
    required: 'Please provide valid option between 1-4',
    trim: true
  },
  skill: {
    type: String,
    required: 'Please provide skill for the question',
    trim: true
  },
  expertise : {
    type: Number,
    required: 'Please provide expertise level 1-3',
    min: 1,
    max: 3
  },

  created: {
    type: Date,
    default: Date.now
  }
  ,
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Question', QuestionSchema);
