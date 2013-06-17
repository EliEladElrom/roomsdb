function getItems(data,dbconnectorCallBackToRooms) {

    var sqlString = "SELECT * FROM [database].[table] WHERE [some-condition] != '' LIMIT 1";

    this.sqlCommand(sqlString,
        function(rows) {
            var vo = new VO(rows[0].id, rows[0].name);
            dbconnectorCallBackToRooms(data,vo);
        }
    );
}

function VO(id, name) {
    this.id = id;
    this.name = name;
}

module.exports.getItems = getItems;