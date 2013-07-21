/*
 * Copyright 2013 Elad Elrom, All Rights Reserved.
 * Code licensed under the BSD License:
 * @author Elad Elrom <elad.ny...gmail.com>
 */
'use strict';

var connection;

function connectdb(host, user, password) {
  var db      = require('mongoose');
  connection = db.createConnection({
    host     : host,
    user     : user,
    password : password
  });

  connection.connect();
}

module.exports.connectdb = connectdb;