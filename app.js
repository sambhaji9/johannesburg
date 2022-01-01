var express = require('express');
var app = new express();
var fileSys = require('fs');
var MongoClient = require('mongodb').MongoClient;
var db = require('./db');

var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.send("Hello Johannesburg");
});

app.get('/about', function (req, res) {
    MongoClient.connect(db.connection.url, function (err, db) {
        if (err) throw err;

        var dbo = db.db("johannesburg");
        dbo.collection("todolist").find().toArray((err, result) => {
            if (err) throw err;

            res.status(200).send(result);
            db.close();
        });
    });
});

app.get('/list', function (req, res) {
    fileSys.readFile('./data.json', function (err, data) {
        console.log(JSON.parse(data));
        res.status(200).send(JSON.parse(data));
    });
});

app.listen(port, function () {
    console.log(`Server started at port ${port}`);
});