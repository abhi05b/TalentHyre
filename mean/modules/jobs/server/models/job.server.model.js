'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Job Schema
 */
var JobSchema = new Schema({
  title: {
    type: String,
    default: '',
    required: 'Please fill Job title',
    trim: true
  },
  description: {
    type: String,
    default: '',
    required: 'Please fill Job description',
    trim: true
  },
  experience:{
        min: Number,
        max: Number
  },
  skills: [{
     expertise:{
        type : Number
     },
     name:{
        type : String
     }      
  }],
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  status:{
    type: String,
    default: 'active'
  }
});

mongoose.model('Job', JobSchema);
