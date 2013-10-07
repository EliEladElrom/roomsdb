/*
 * Copyright 2013 Elad Elrom, All Rights Reserved.
 * Code licensed under the BSD License:
 * @author Elad Elrom <elad.ny...gmail.com>
 */

'use strict';

var connection;

function connectdb(host, user, password) {
  var db      = require('mysql');
    connection = db.createConnection({
      host     : host,
      user     : user,
      password : password
  });

  connection.connect();
}

function runSQLCommand(sql, sqlCallback) {
  connection.query(sql, function (err, rows, fields) {
      sqlCallback(rows, err);
    });
}

module.exports.connectdb = connectdb;
module.exports.runSQLCommand = runSQLCommand;