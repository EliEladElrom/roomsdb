/*
 * Copyright 2013 Elad Elrom, All Rights Reserved.
 * Code licensed under the BSD License:
 * @author Elad Elrom <elad.ny...gmail.com>
 */

'use strict';

var connection,
    _host,
    _user,
    _password;

function connectdb(host, user, password) {
  var db      = require('mysql');

    _host = host;
    _user = user;
    _password = password;

    connection = db.createConnection({
      host     : host,
      user     : user,
      password : password
  });

  connection.connect();
}

function runSQLCommand(sql, sqlCallback) {

  connectdb(_host, _user, _password);

  connection.query(sql, function (err, rows, fields) {
      sqlCallback(rows, err);
    });

  // close connection once completed
  connection.end();
}

module.exports.connectdb = connectdb;
module.exports.runSQLCommand = runSQLCommand;
