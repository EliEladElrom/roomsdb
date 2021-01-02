/*
 * Copyright 2020 Elad Elrom, All Rights Reserved.
 * Code licensed under the BSD License:
 * @author Elad Elrom <elad.ny...gmail.com>
 */

'use strict';

var connection,
    _host,
    _user,
    _database,
    _port,
    _password;

function connectdb(host, user, password, database, port, timeout) {
  const { Client } = require('pg');

    _host = host;
    _user = user;
    _password = password;
    _database = database;
    _port = port;

    connection = new Client({
      host     : host,
      user     : user,
      password : password,
      database : database,
      port     : port,
      timeout  : timeout
    });

    connection.connect();
}

function runSQLCommand(sql, sqlCallback) {

  connectdb(_host, _user, _password, _database, _port);

  connection.query(sql, (err, result) => {
    sqlCallback(result, err);
    connection.end();
  });
}

module.exports.connectdb = connectdb;
module.exports.runSQLCommand = runSQLCommand;
