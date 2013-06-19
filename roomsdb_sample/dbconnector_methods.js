/*
 * Copyright 2013 Elad Elrom, All Rights Reserved.
 * Code licensed under the BSD License:
 * @author Elad Elrom <elad.ny...gmail.com>
 */

// list all the different methods that the dbconnector will be using here

function setMethods(dbconnector) {

    // getItems method
    dbconnector.getItems = require('./service/getitems.js').getItems;

    // method #2 implement
    // method #3 implement

}

module.exports.setMethods = setMethods;