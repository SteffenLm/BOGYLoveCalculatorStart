var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");

// Mini-Datenbankserver als NPM Paket (als Javascript Implementation).
var sqlite3 = require('sqlite3');

const path = require('path');
const dbPath = path.resolve(__dirname, 'articleHire.db');
const secretKey = require('../login/secretKey.json');


console.log(__dirname);

let db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error(err.message);
    }
    initDatabase();
    console.log('Connected to the cars database.');
});

function initDatabase() {
    
    // eine Tabelle erzeugen, falls diese noch nicht existiert.
    query = "CREATE TABLE IF NOT EXISTS user ( id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL DEFAULT '', firstname TEXT NOT NULL DEFAULT '', lastname TEXT NOT NULL DEFAULT '', pwd TEXT NOT NULL DEFAULT '', roleAdmin INTEGER NOT NULL DEFAULT 0, roleCustomer INTEGER NOT NULL DEFAULT 0  )";
    db.run (query);
    query = "INSERT INTO user (username, pwd) VALUES ('admin', 'admin')";
    db.run(query);
}

router.get('/', function(req, res, next) {
    var query = "SELECT * FROM user";
    db.all(query, [], (err, rows) => {
        if (err) {
            res.send( err.message );
        }
        res.send( { user: rows });
    });
});


router.get('/id/:userId', function(req, res, next) {
    let userId = req.params.userId;

    let query = "SELECT * FROM user where id = '" + userId + "'";
    console.log(query);
    db.all(query, [], (err, rows) => {
        if (err) {
            res.send( err.message );
        }
        console.log(rows);
        res.send( { user: rows[0] });
    });
});


router.post('/', function(req, res, next) {
    console.log(req.body);
    let username = req.body.username || '';
    let firstname = req.body.firstname || '';
    let lastname = req.body.lastname || '';
    let pwd = req.body.pwd || '';
    let roleAdmin = req.body.roleAdmin || 0;
    let roleCustomer = req.body.roleAdmin || 0;

    let query = "INSERT INTO user (username, firstname, lastname, pwd, roleAdmin, roleCustomer) VALUES ( '" + username  + "', '" + firstname + "', '" + lastname +  "', '" + pwd + "'," + roleAdmin + "," + roleCustomer + ");";
    // INSERT INTO user (username, firstname, lastname, pwd, roleAdmin, roleCustomer) VALUES ( 'Gardener', 'Silke', 'Wiese', 'averycomplexpwd', 0, 1);
    console.log(query);
    db.run (query,  function(err) {
        if (err) {
            return res.send(err.message);
        }
        // get the last insert id
        console.log("row added");
        res.send({status: "ok"});
    });
});

router.put('/', function(req, res, next) {
    let userId = req.body.id || -1;
    if (userId === -1) {
        res.end("invalid ID");
        return;
    }
    let username = req.body.username || '';
    let firstname = req.body.firstname || '';
    let lastname = req.body.lastname || '';
    let pwd = req.body.pwd || ''
    let roleAdmin = req.body.roleAdmin || 0;
    let roleCustomer = req.body.roleAdmin || 0;

    var query = "UPDATE user SET username = '" + username  + "', firstname = '" + firstname  + "', lastname = '" + lastname + "', pwd = '" + pwd +"', roleAdmin =" + roleAdmin + ",roleCustomer = "+ roleCustomer + " WHERE id = " + userId;
    // UPDATE user SET username = 'Gardener', firstname = 'Silke', lastname = 'Wiese', pwd = '12345', roleAdmin = 0, roleCustomer = 1
    console.log(query);
    db.run (query,  function(err) {
        if (err) {
            return res.send(err.message);
        }
        // get the last insert id
        console.log("row modified");
        res.send({status: "ok"});
    });
});


router.delete('/:id', function(req, res, next) {
    var idUser = req.params.id || -1;
    if (idUser == -1) {
        res.send({status: "invalid id"});
        return;
    }

    var query = "DELETE FROM user WHERE id = " + idUser;
    console.log(query);
    db.run (query,  function(err) {
        if (err) {
            return res.send(err.message);
        }
        console.log("row with id " + idUser + " deleted")
        res.send({status: "ok"});
    });
});

// ############### Login

router.post('/auth', function(req,res,next) {
    let username = req.body.username || '';
    let password = req.body.password || '';

    // hier können auch noch validators eingeführt werden zur Erhöhung der Sicherheit.
    if ((username === '') || (password === '')) {
        res.send({ msg: "invalid username or password"})
    }

    let query = "SELECT * FROM user where username = '" + username + "'";
    db.all(query, [], (err, rows) => {
        if (err) {
            res.send( err.message );
            return;
        }
        if ((rows[0].username === username) && (rows[0].pwd === password)) {
            let userInToken = {
                username: rows[0].username,
                firstname: rows[0].firstname,
                lastname: rows[0].lastname,
                roleAdmin: rows[0].roleAdmin,
                roleCustomer: rows[0].roleCustomer
            };
            const token = jwt.sign({sub: rows[0].username}, secretKey.secretKey);
            res.send({
                userInToken,
                token
            });
        }
        else {
            res.send({ msg: "invalid username or password"})
        }
    });
});

module.exports = router;
