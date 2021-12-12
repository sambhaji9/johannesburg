var express = require('express');
var app = new express();
var fileSys = require('fs');

var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.send("Hello Johannesburg");
});

app.get('/about', function (req, res) {
    res.send("This is about page");
});

app.get('/list', function (req, res) {
    fileSys.readFile('./data.json', function(err, data) {
        console.log(JSON.parse(data));
        res.status(200).send(JSON.parse(data));
    });
});

app.listen(port, function() {
    console.log(`Server started at port ${port}`);
});