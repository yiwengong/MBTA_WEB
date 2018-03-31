const mysql = require('mysql');
const setOfLine = require('./commuterail').setOfLine;

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
        setOfLine.forEach(function(line) {
            var sql = 'INSERT IGNORE INTO lineNames (name) VALUES (' + '\'' + line + '\')';
            db.query(sql, function (err) {
                if (err) throw err;
            });
        });
    }
});