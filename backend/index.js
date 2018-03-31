const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const saltPassword = require('./saltPassword');


const app = express();

// cors OPTIONS
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Database setup - mysql
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
   }
});

// App Setup
// middlewares
app.use(bodyParser.json());
app.use(cors());

app.post('/register', function(req, res) {
    var name = req.body.name;
    var encryptPassword  = saltPassword.makePasswordEntry(req.body.password);
    var sql = 'INSERT INTO users (name, password, salt) VALUES ('
        + '\'' + name + '\', ' + '\'' + encryptPassword.hash +'\',' +'\'' + encryptPassword.salt + '\')';
    db.query(sql, function(err,result) {
       if (err) {
           res.status(401).send({message: 'Register Failed'});
       } else {
           res.status(200).send({message: 'Register Successfully', userId: result.insertId})
       }
    });
});

app.post('/login', function(req, res) {
    var name = req.body.name;
    var password = req.body.password;
    var sql = 'SELECT * FROM users WHERE name = \'' + name + '\'';
    db.query(sql, function(err,result) {
        if (err) {
            res.status(401).send({message: 'Login Failed'});
        } else if (result.length == 0) {
            res.status(401).send({message: 'Login Failed'});
        } else {
            if (saltPassword.doesPasswordMatch(result[0].password, result[0].salt, password)) {
                res.status(200).send({message: 'Login Successfully', userId: result[0].id});
            } else {
                res.status(422).send({message: 'Password or Username is incorrect'});
            }
        }
    });
});

app.get('/station', function(req, res) {
    if (req.query.from_id) {
        var sql = 'SELECT\n' +
            'DISTINCT destRoute.name, destRoute.id\n' +
            'FROM\n' +
            '(SELECT\n' +
            'route_to_line.id_line as fromLineId\n' +
            'FROM\n' +
            'route_to_line\n' +
            'WHERE route_to_line.id_route = ' +
            req.query.from_id +
            ') as fromLineRoute\n' +
            'JOIN route_to_line as destLineId ON fromLineRoute.fromLineId = destLineId.id_line\n' +
            'JOIN routeNames as destRoute ON destRoute.id = destLineId.id_route\n' +
            'WHERE destRoute.id != ' +
            req.query.from_id + '\n' +
            'ORDER BY destRoute.name\n';
        db.query(sql, function(err,results) {
            if (err) {
                res.status(401).send({message: 'Fetch Station Failed'});
            } else {
                res.status(200).send(results);
            }
        })
    } else {
        var sql = 'SELECT * FROM routeNames ORDER BY name';
        db.query(sql, function(err, result) {
            if (err) {
                res.status(401).send({message: 'Fetch Station Failed'});
            } else {
                res.status(200).send(result);
            }
        });
    }

});

app.post('/history', function(req, res) {
    var userID = req.body.userID;
    var from_id = req.body.from_id;
    var to_id = req.body.to_id;
    var sql = 'INSERT INTO history (id_user, from_id, to_id) VALUES ('
        + '\'' + userID + '\', ' + '\'' + from_id + '\',' + '\''+ to_id  + '\')';
    console.log(sql);
    db.query(sql, function(err) {
        if (err) {
            res.status(401).send({message: 'Can not save the record into history'});
        } else {
            res.status(200).send({message: 'Save the record into history Successfully'});
        }
    })
});

app.get('/history', function(req, res) {
    var sql = 'SELECT ' +
        'route_from.name as fromName, route_to.name as toName, history.time ' +
        'FROM ' +
        'history ' +
        'JOIN routeNames as route_from ON history.from_id = route_from.id ' +
        'JOIN routeNames as route_to ON history.to_id = route_to.id ' +
        'WHERE history.id_user = ' +
        req.query.userId;
    db.query(sql, function(err,results) {
        if (err) {
            res.status(401).send({message: 'Can not fetch data from history'});
        } else {
            res.status(200).send(results);

        }
    });
});

app.listen('3600', function() {
    console.log('Server started on port 3600');
});

