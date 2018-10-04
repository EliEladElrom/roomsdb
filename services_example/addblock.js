/*
Example:
http://localhost:8081/addBlock?key=name&value=level
*/
'use strict';

let params;

function addblock(data, dbconnectorCallBackToRooms) {
    let connector = this.getConnector(),
        params = data.params;

    connector.put(params.key, params.value, function (err) {
        if (err) {
            return dbconnectorCallBackToRooms(null, {status: 'error', error: err});
        }

        connector.get(params.key, function (err, value) {
            if (err) return dbconnectorCallBackToRooms(null, {status: 'error', error: err});

            // Ta da!
            console.log(params.key + '=' + value);
            dbconnectorCallBackToRooms(data, {status: params.key + '=' + value});
        })
    });
}

module.exports.addblock = addblock;