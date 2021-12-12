var express = require('express');
var app = new express();

var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.send("Hello Johannesburg");
});

app.get('/about', function (req, res) {
    res.send("This is about page");
});

app.listen(port, function() {
    console.log(`Server started at port ${port}`);
});