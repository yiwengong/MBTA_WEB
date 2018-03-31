const mysql = require('mysql');
const routesToLines = require('./commuterail').routesToLines;

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'root',
    port: '3306',
    database:'DB_MBTA',
    multipleStatements: true
});

db.connect(function(error) {
    if (!!error) {
        console.log('Error');
    } else {
        console.log('Connected');
        var id_route = 0, id_line = 0;
        routesToLines.forEach(function(routeToLine) {
                routeToLine.line.forEach(function(l) {
                    var sql =  'SELECT * FROM routeNames WHERE name = \'' + routeToLine.route + '\';'
                        + 'SELECT * FROM lineNames WHERE name = \'' + l + '\';';

                    db.query(sql, function (err, results) {
                        if(err) throw err;
                        id_route = results[0][0].id;
                        id_line = results[1][0].id;

                        console.log('route: ' + id_route);
                        console.log('line: ' + id_line);

                        sql = 'INSERT INTO route_to_line (id_route, id_line) VALUES ('
                           + '\'' + id_route + '\', ' + '\'' + id_line + '\')';
                        db.query(sql, function(err) {
                           if (err) throw err;
                        });
                    })
                });
        });
    }
});