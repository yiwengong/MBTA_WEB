const mysql = require('mysql');

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

        var sql = 'DROP TABLE IF EXISTS history';
        db.query(sql, function (err) {
            if (err) throw err;
        });

        sql = 'DROP TABLE IF EXISTS route_to_line';
        db.query(sql, function(err) {
            if (err) throw err;
        });

        sql = 'DROP TABLE IF EXISTS users';
        db.query(sql, function(err) {
            if (err) throw err;
        });

        sql = 'DROP TABLE IF EXISTS routeNames';
        db.query(sql, function(err) {
            if (err) throw err;
        });

        sql = 'DROP TABLE IF EXISTS lineNames';
        db.query(sql, function(err) {
            if (err) throw err;
        });

        sql = 'CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) UNIQUE, name VARCHAR(255) UNIQUE, password VARCHAR(255), salt VARCHAR(255))';
        db.query(sql, function(err) {
            if (err) throw err;
            console.log('Users table created');
        });

        sql = 'CREATE TABLE routeNames (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) UNIQUE)';
        db.query(sql, function(err) {
            if (err) throw err;
            console.log('Routes table created');
        });

        sql = 'CREATE TABLE lineNames (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) UNIQUE)';
        db.query(sql, function(err) {
            if (err) throw err;
            console.log('Lines table created');
        });

        sql = 'CREATE TABLE route_to_line '+
            '(id_route INT, ' +
            'id_line INT, ' +
            'INDEX (id_route, id_line), ' +
            'FOREIGN KEY (id_route) REFERENCES routeNames(id), ' +
            'FOREIGN KEY (id_line) REFERENCES lineNames(id))';
        db.query(sql, function(err) {
            if (err) throw err;
            console.log('Route_to_line table created');
        });

        sql = 'CREATE TABLE history '+
            '(id_user INT, from_id INT, ' +
            'to_id INT, time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, ' +
            'INDEX (id_user), ' +
            'FOREIGN KEY (id_user) REFERENCES users(id), ' +
            'FOREIGN KEY (from_id) REFERENCES routeNames(id), ' +
            'FOREIGN KEY (to_id) REFERENCES routeNames(id))';
        db.query(sql, function(err) {
            if (err) throw err;
            console.log('History table created');
        });
    }
});



