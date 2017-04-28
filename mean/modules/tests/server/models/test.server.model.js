'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Test Schema
 */
var TestSchema = new Schema({
  score: {
    type: Number,
    max: 100
  },
  testQuestions: {
    type: Array,
    default: '',
    required: 'Please provide Test Questions',
    trim: true
  },
  job: {
    type: Schema.ObjectId,
    ref: 'Job'
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Test', TestSchema);
