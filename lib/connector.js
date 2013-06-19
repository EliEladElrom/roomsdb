/*
 * Copyright 2013 Elad Elrom, All Rights Reserved.
 * Code licensed under the BSD License:
 * @author Elad Elrom <elad.ny...gmail.com>
 */

var path = require('path'),
    fs = require('fs'),
    isdebugmode = true

function setServices(serviceFilesPath) {
    'use strict';
    setMethods(serviceFilesPath);
}

function setMethods(serviceFilesPath) {
    'use strict';

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

connectToDatabase = function (dbType, host, user, password, isdebug) {
    isdebugmode = isdebug;
    log('connectdb:: host:' + host + ', user:' + user + ', password:' + password);

    switch (dbType) {
    case 'mysql':
        connector = require('./mysqlconnector.js');
        connector.connectdb(host, user, password);
        break;
    default:
        log(dbType + ' database type not supported yet');
    }
}

sqlCommand = function (sql, sqlCallback) {
    connector.runSQLCommand(sql, sqlCallback);
}

var log = function logmsg(message) {
    if (isdebugmode)
        console.log(message);
}

findServices = function(serviceFilesPath) {
    var serviceDir = path.join(__dirname, '../../../',serviceFilesPath),
        serviceList = find(serviceDir, /\.js$/);

    return serviceList;
}

find = function (filepath, opt_pattern) {
    return fs.readdirSync(filepath).filter(function(file) {
        return (opt_pattern || /.*/).test(file);
    });
};

if (typeof exports != 'undefined' ) {
    exports.setServices = setServices;
    exports.connectToDatabase = connectToDatabase;
    exports.sqlCommand = sqlCommand;
}