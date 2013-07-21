/*
 * Copyright 2013 Elad Elrom, All Rights Reserved.
 * Code licensed under the BSD License:
 * @author Elad Elrom <elad.ny...gmail.com>
 */
'use strict';

var db,
  mongoose,
  models = [];

function connectdb(host, options) {
  mongoose = require('mongoose');
  mongoose.connect(host);

  db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function callback() {
    // console.log('connection open');
  });
}

function setSchema(object) {
  var schema = mongoose.Schema(object);
  return schema;
}

function isModelExists(name) {
  var i;
  for (i = 0; i < models.length; i++) {
    if (models[i].name === name) {
      return true;
    }
  }
  return false;
}

function setModel(name, schema) {
  var model = mongoose.model(name, schema);
  models.push({
    'model': model,
    'name': name
  });

  return model;
}

function getModel(name) {
  var i;
  for (i = 0; i < models.length; i++) {
    if (models[i].name === name) {
      return models[i].model;
    }
  }
  return null;
}

module.exports.connectdb = connectdb;
module.exports.setSchema = setSchema;
module.exports.setModel = setModel;
module.exports.isModelExists = isModelExists;
module.exports.getModel = getModel;