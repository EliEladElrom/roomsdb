/*
 * Copyright 2018 Elad Elrom, All Rights Reserved.
 * Code licensed under the BSD License:
 * @author Elad Elrom <elad.ny...gmail.com>
 */
'use strict';

var level,
    db;

function connectdb(location, options) {
    level  = require('level');

    db = level(location, options, function (err, db) {
        if (err) throw err
    })
}

function get(key, callback) {
    db.get(key, function (err, value) {
        if (err) return callback(err);
        return callback(null, value);
    });
}

function put(key, value, callback) {
    db.put(key, value, function (err) {
        if (err) return callback(err);
        return callback();
    });
}

module.exports.connectdb = connectdb;
module.exports.db = db;
module.exports.get = get;
module.exports.put = put;