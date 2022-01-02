var express = require('express');
var app = new express();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var db = require('./db');
var utils = require('./util');

var port = process.env.PORT || 3000;

// create application/x-www-form-urlencoded bodyParser
app.use(express.json());

app.get('/', function (req, res) {
    res.send("Hello Johannesburg");
});

app.get('/getTasks', function (req, res) {
    MongoClient.connect(db.connection.url, function (err, db) {
        if (err) throw err;

        var dbo = db.db("johannesburg");
        dbo.collection("todolist").find().toArray((err, result) => {
            console.log(result);
            if (err) throw err;

            res.status(200).send(result);
            db.close();
        });
    });
});

app.post('/createTask', function (req, res) {
    req.body.timeStamp = utils.getUnixTimeStamp();
    //res.status(200).send(req.body);
    MongoClient.connect(db.connection.url, (err, db) => {
        if (err) throw err;

        var dbo = db.db("johannesburg");
        dbo.collection("todolist").insertOne(req.body, (err, result) => {
            if (err) throw err;

            console.log("1 document inserted");
            res.status(200).send(result);
            db.close();
        });
    });
});

app.put('/updateTask', function (req, res) {
    MongoClient.connect(db.connection.url, (err, db) => {
        if (err) throw err;

        var dbo = db.db("johannesburg");
        var myquery = { "_id": mongodb.ObjectID("61d06e2e67fad2c9cc285545")};
        var newValues = { $set: { description: "This is updated description 112343636454" } };
        dbo.collection("todolist").updateOne(myquery, newValues, (err, result) => {
            if (err) throw err;

            res.status(200).send(result);
            console.log("1 document updated");
            db.close();
        });
    });
});

app.delete('/deleteTask', function (req, res) {
    MongoClient.connect(db.connection.url, (err, db) => {
        if (err) throw err;

        var dbo = db.db("johannesburg");
        var myquery = { "_id": mongodb.ObjectID("61d06e2e67fad2c9cc285545")};
        dbo.collection("todolist").deleteOne(myquery, (err, result) => {
            if (err) throw err;

            res.status(200).send(result);
            console.log("1 document deleted");
            db.close();
        });
    });
});

app.listen(port, function () {
    console.log(`Server started at port ${port}`);
});