var express = require('express');
var matchImages = require('./matchImages.js');

var app = express(); 
app.use(express.bodyParser());

app.get('/test', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(matchImages.oneToManyMatch('image192.js'));
});
app.post('/match', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.body);
    res.send('ok');
});
app.listen(3000);
