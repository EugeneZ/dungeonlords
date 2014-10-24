'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Game Schema
 */
var GameSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Validations
 */
GameSchema.path('title').validate(function(title) {
  return !!title;
}, 'Title cannot be blank');

/**
 * Statics
 */
GameSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('owner', 'name username').exec(cb);
};

mongoose.model('Game', GameSchema);
