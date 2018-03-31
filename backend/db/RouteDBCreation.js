const mysql = require('mysql');
const routes = require('./commuterail').routes;

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'root',
    port: '3306',
    database:'DB_MBTA'
});

db.connect(function(error) {
    if (!!error) {
        console.log('Error');
    } else {
        console.log('Connected');
        routes.forEach(function(route) {
            var sql = 'INSERT IGNORE INTO routeNames (name) VALUES (' + '\'' + route + '\')';
            db.query(sql, function (err) {
               if (err) throw err;
            });
        });
    }
    db.end();
});



