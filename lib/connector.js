/*
 * Copyright 2013 Elad Elrom, All Rights Reserved.
 * Code licensed under the BSD License:
 * @author Elad Elrom <elad.ny...gmail.com>
 */

var isdebugmode = true;
var connector;

function connectToDatabase(dbType, host, user, password, isdebug) {
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

function sqlCommand(sql, sqlCallback) {
    connector.runSQLCommand(sql, sqlCallback);
}

var log = function logmsg(message) {
    if (isdebugmode)
        console.log(message);
}

module.exports.connectToDatabase = connectToDatabase;
module.exports.sqlCommand = sqlCommand;
