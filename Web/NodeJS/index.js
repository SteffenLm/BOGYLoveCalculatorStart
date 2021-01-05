const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3');
const jwt = require('jsonwebtoken');
const secretKey = require('./src/secret.json');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

//init database
const dbPath = path.resolve(__dirname, 'lovecalculator.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error(err.message);
    }

    const userTableQuery = `CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        mail TEXT NOT NULL UNIQUE,
        username TEXT NOT NULL UNIQUE,
        password char(255) NOT NULL
    );`;
    db.run(userTableQuery);
    const matchTableQuery = `CREATE TABLE IF NOT EXISTS match (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userid INTEGER NOT NULL,
        firstname TEXT NOT NULL,
        secondname TEXT NOT NULL,
        result INTEGER NOT NULL,
        created_at TEXT NOT NULL DEFAULT (DATETIME('now')),
        CONSTRAINT fk_userid FOREIGN KEY (userid) REFERENCES user (id),
        CONSTRAINT UQ_match UNIQUE(userid, firstname, secondname)
    );`;
    // const matchTableQuery = `DROP TABLE IF EXISTS match`;
    db.run(matchTableQuery);
});

app.use(express.json());
app.post('/api/register', function (req, res, next) {
    const name = req.body.name;
    const password = req.body.password;
    const username = req.body.username;
    const mail = req.body.mail;
    const isValidMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(mail);
    if (name != null && name != '' && name.length >= 3
        && password != null && password != '' && password.length >= 8
        && username != null && username != '' && username.length >= 3
        && isValidMail) {
        //check if mail is already used
        const countQuery = `SELECT COUNT(*) AS NoOfMails
        FROM user
        WHERE mail = ?`;
        db.get(countQuery, [mail], (err, row) => {
            if (row.NoOfMails === 0) {
                //check if username is already used
                const countUsernameQuery = `SELECT COUNT(*) as NoOfUsernames
                FROM user
                WHERE username = ?`;
                db.get(countUsernameQuery, [username], function (err, row) {
                    if (row.NoOfUsernames === 0) {
                        db.run(`INSERT INTO user(name, mail, username, password) VALUES(?, ?, ?, ?)`, [name, mail, username, password], function (err) {
                            if (err) {
                                res.status(400).end();
                            } else {
                                res.status(200).end();
                            }
                        });
                    } else {
                        res.status(400).end();
                    }
                });
            } else {
                res.status(400).end();
            }
        });
    } else {
        res.status(400).end();
    }
});

app.post('/api/login', function (req, res, next) {
    const password = req.body.password;
    const username = req.body.username;
    if (password != null && password != '' && password.length >= 8 && username != null && username != '' && username.length >= 3) {
        //check if mail is already used
        const countQuery = `SELECT *
        FROM user
        WHERE username = ?`;
        db.get(countQuery, [username], (err, row) => {
            if (row.username == username && row.password === password) {
                const payload = {
                    sub: row.id
                };
                const token = jwt.sign(payload, secretKey.secret);
                res.status(200).send(token);
            } else {
                res.status(400).end();
            }
        });
    } else {
        res.status(400).end();
    }
});

app.post('/api/match', function (req, res, next) {
    const token = req.headers.authorization.slice(7)
    if ((token !== undefined || token !== null) &&
        (req.body.firstname !== null && req.body.firstname !== undefined && req.body.firstname.length >= 3) &&
        (req.body.secondname !== null && req.body.secondname !== undefined && req.body.secondname.length >= 3) &&
        (req.body.result !== null && req.body.result !== undefined && req.body.result >= 0 && req.body.result <= 100)) {
        const payload = jwt.verify(token, secretKey.secret);
        const userid = payload.sub;
        const insertMatchQuery = `INSERT INTO match (userid, firstname, secondname, result) VALUES (?, ?, ?, ?)`;
        db.run(insertMatchQuery, [userid, req.body.firstname, req.body.secondname, req.body.result], function (err) {
            if (err) {
                if (err.errno === 19) {
                    res.status(400).send({ msg: 'Match already saved!' });
                } else {
                    res.status(400).end();
                }
            } else {
                res.status(201).send();
            }
        });

    } else {
        res.status(401).end();
    }
});

app.get('/api/match', function (req, res, next) {
    const token = req.headers.authorization.slice(7)
    if (token !== undefined && token !== null) {
        const payload = jwt.verify(token, secretKey.secret);
        const userid = payload.sub;
        const selectMatchQuery = `
        SELECT firstname, secondname, result, created_at
        FROM match
        WHERE userid = ?`;
        db.all(selectMatchQuery, [userid], function (err, rows) {
            res.status(200).send(rows);
        });
    } else {
        res.status(401).end();
    }
});

const port = 8080;
app.listen(port, function () {
    console.log('app listening on port ' + port);
});