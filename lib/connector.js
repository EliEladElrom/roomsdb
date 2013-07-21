/*
 * Copyright 2013 Elad Elrom, All Rights Reserved.
 * Code licensed under the BSD License:
 * @author Elad Elrom <elad.ny...gmail.com>
 */
'use strict';

var path = require('path'),
  fs = require('fs'),
  isdebugmode = true;

function setServices(serviceFilesPath) {
  setMethods(serviceFilesPath);
}

function setMethods(serviceFilesPath) {
  var methodName,
    fileName,
    service,
    i,
    serviceList,
    serviceDir,
    retVal;

  retVal = {};
  serviceList = findServices(serviceFilesPath);
  serviceDir = path.join(__dirname, '../../../', serviceFilesPath);

  for (i = 0; i < serviceList.length; i++) {
    fileName = serviceList[i];
    methodName = fileName.replace('.js', '');
    log('adding service method: ' + methodName);
    service = require(serviceDir + fileName);

    exports[methodName] = service[methodName];
  }

  return retVal;
}

var connectToDatabase = function (dbType, host, user, password, isdebug) {
  isdebugmode = isdebug;
  log('connectdb:: host:' + host + ', user:' + user + ', password:' + password);

  switch (dbType) {
  case 'mysql':
    var connector = require('./mysqlconnector.js');
    connector.connectdb(host, user, password);
    break;
  case 'mongodb':
    var connector = require('./mongodbconnector.js');
    connector.connectdb(host, user);
    break;
  default:
    log(dbType + ' database type not supported yet');
  }
}

var sqlCommand = function (sql, sqlCallback) {
  connector.runSQLCommand(sql, sqlCallback);
}

var findServices = function(serviceFilesPath) {
  var serviceDir = path.join(__dirname, '../../../',serviceFilesPath),
    serviceList = find(serviceDir, /\.js$/);

  return serviceList;
}

var find = function (filepath, opt_pattern) {
  return fs.readdirSync(filepath).filter(function(file) {
    return (opt_pattern || /.*/).test(file);
  });
};

var log = function logmsg(message) {
  if (isdebugmode)
    console.log(message);
}

if (typeof exports != 'undefined' ) {
  exports.setServices = setServices;
  exports.connectToDatabase = connectToDatabase;
  exports.sqlCommand = sqlCommand;
}