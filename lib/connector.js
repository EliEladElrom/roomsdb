/*
 * Copyright 2013 Elad Elrom, All Rights Reserved.
 * Code licensed under the BSD License:
 * @author Elad Elrom <elad.ny...gmail.com>
 */
'use strict';

var path = require('path'),
  fs = require('fs'),
  isdebugmode = true,
  connector,
  app;

function setServices(serviceFilesPath, opt_app) {
  app = opt_app;
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

    if (app !== null) {
      log('created rest API: /' + methodName);
      app.get('/' + methodName, function (req, res) {
        var method = req.route.path.substring(1, req.route.path.length);
        var data = {};
        data.params = {};

        for (var prop in req.query) {
          data.params[prop] = req.query[prop];
        }

        exports[method](data, function (data, result) {
          res.send(result);
        });
      });
    }

  }

  return retVal;
}

var connectToDatabase = function (dbType, host, options, isdebug) {
  isdebugmode = isdebug;
  log('connectdb:: host:' + options.host);

  switch (dbType) {
  case 'mysql':
    connector = require('./mysqlconnector.js');
    connector.connectdb(host, options.user, options.password);
    break;
  case 'mongodb':
    connector = require('./mongodbconnector.js');
    connector.connectdb(host, options);
    break;
  default:
    log(dbType + ' database type not supported yet');
  }
}

var getConnector = function () {
  return connector;
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
  exports.getConnector = getConnector;
}