var express = require('express');
var router = express.Router();

// Mini-Datenbankserver als NPM Paket (als Javascript Implementation).
var sqlite3 = require('sqlite3');

const path = require('path');
const dbPath = path.resolve(__dirname, 'articleHire.db');

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
    query = "CREATE TABLE IF NOT EXISTS userArticle ( id INTEGER PRIMARY KEY AUTOINCREMENT, userId INTEGER  NOT NULL, articleId INTEGER  NOT NULL, startDate TEXT NOT NULL DEFAULT '', endDate TEXT NOT NULL DEFAULT '')";
    db.run (query);
}

router.get('/', function(req, res, next) {
    var query = "SELECT * FROM userArticle";
    db.all(query, [], (err, rows) => {
        if (err) {
            res.send( err.message );
        }
        res.send( { userArticle: rows });
    });
});

router.get('/byUser/', function(req, res, next) {
    console.log(req.user);
    if (req.user === undefined) {
        res.send({status: "no user logged in"})
        return;
    }

    let query = "SELECT * FROM user where username = '" + req.user.sub + "'";
    db.all(query, [], (err, rows) => {
        console.log(rows);
        let userId = rows[0].id;
        let query2 = "SELECT * FROM userArticle where userId = '" + userId +"'";
        db.all(query2, [], (err, rows2) => {
            if (err) {
                res.send( err.message );
                return;
            }
            res.send( { userArticle: rows2 });
        });
    });
});



router.post('/', function(req, res, next) {
    console.log(req.body);
    let userId = req.body.userId || 0;
    let articleId = req.body.articleId || 0;
    let startDate = req.body.startDate || '';
    let endDate = req.body.endDate || '';

    let query = "INSERT INTO userArticle (userId, articleId, startDate, endDate) VALUES ( '" + userId  + "', '" + articleId + "', '" + startDate +  "', '" + endDate + "');";
    // INSERT INTO userArticle (userId, articleId, startDate, endDate) VALUES ( '1', '1', '2020-06-26', '2020-06-28');
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
    let userArticleId = req.body.userArticleId || -1;
    if (userArticleId === -1) {
        res.end({status: "invalid ID"});
        return;
    }
    let userId = req.body.userId || 0;
    let articleId = req.body.articleId || 0;
    let startDate = req.body.startDate || '';
    let endDate = req.body.endDate || '';
    console.log(req.body);

    var query = "UPDATE userArticle SET userId = " + userId  + ", articleId = " + articleId  + ", startDate = '" + startDate + "', endDate = '" + endDate +"' WHERE id = " + userArticleId;
    // UPDATE userArticle SET userId = 1, articleId = 1, startDate = '2020-06-26', endDate = '2020-06-27' WHERE id = 1
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
    var idUserArticle = req.params.id || -1;
    if (idUserArticle == -1) {
        res.send("invalid id");
        return;
    }

    var query = "DELETE FROM userArticle WHERE id = " + idUserArticle;
    // DELETE FROM userArticle WHERE id = 3
    console.log(query);
    db.run (query,  function(err) {
        if (err) {
            return res.send(err.message);
        }
        console.log("row with id " + idUserArticle + " deleted")
        res.send({status: "ok"});
    });
});

module.exports = router;
