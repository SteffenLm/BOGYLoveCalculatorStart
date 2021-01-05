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
    var query = "CREATE TABLE IF NOT EXISTS article ( id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL DEFAULT '', category TEXT NOT NULL DEFAULT '', note TEXT NOT NULL DEFAULT '', pricePerDay FLOAT NOT NULL DEFAULT 0, isProTool INTEGER NOT NULL DEFAULT 0, isAvailable INTEGER NOT NULL DEFAULT 0 );";
    db.run (query);

}

router.get('/', function(req, res, next) {
    var query = "SELECT * FROM article";
    db.all(query, [], (err, rows) => {
        if (err) {
            res.send( err.message );
        }
        res.send( { article: rows });
    });
});


router.post('/', function(req, res, next) {
    console.log(req.body);
    let name = req.body.name || '';
    let note = req.body.note || '';
    let category = req.body.category || '';
    let pricePerDay = req.body.pricePerDay || 0;
    let isProTool = req.body.isProTool || 0;
    let isAvailable = req.body.isAvailable || 0;

    let query = "INSERT INTO article (name, note, category, pricePerDay, isProTool, isAvailable) VALUES ( '" + name  + "', '" + note + "', '" + category +  "', " + pricePerDay + ", " + isProTool + ", " + isAvailable +");";
    // "INSERT INTO cars (name, type, fin, powerKw) VALUES ('BMW', '320i', 'FIN383883', 184)
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
    let articleId = req.body.id || -1;
    if (articleId === -1) {
        res.end({status: "invalid ID"});
        return;
    }

    let name = req.body.name || '';
    let note = req.body.note || '';
    let category = req.body.category || '';
    let pricePerDay = req.body.pricePerDay || 0;
    let isProTool = req.body.isProTool || 0;
    let isAvailable = req.body.isAvailable || 0;
    console.log(req.body);

    var query = "UPDATE article SET name = '" + name  + "', note = '" + note  + "', category = '" + category + "', pricePerDay = " + pricePerDay +", isProTool = " + isProTool + ", isAvailable = " + isAvailable +  " WHERE id = " + articleId;
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

router.put('/datafield', function(req, res, next) {
    let articleId = req.body.id || -1;
    if (articleId === -1) {
        res.end("invalid ID");
        return;
    }

    let dataField = req.body.datafield;
    let value = req.body.value;

    var query = "UPDATE article SET " + dataField + " = '" + value  + "' WHERE id = " + articleId;
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
    var idArticle = req.params.id || -1;
    if (idArticle == -1) {
        res.send({status: "invalid id"});
        return;
    }

    var query = "DELETE FROM article WHERE id = " + idArticle;
    console.log(query);
    db.run (query,  function(err) {
        if (err) {
            return res.send(err.message);
        }
        console.log("row with idCar " + idArticle + " deleted")
        res.send({status: "ok"});
    });
});

module.exports = router;
