var express = require('express');
var matchImages = require('./matchImages.js');
var htmltemplate = require('./indexHTMLTemplate.js');

var app = express(); 
app.use(express.bodyParser());

var io = require('socket.io').listen(4000);
io.set('log level', 1);
io.sockets.on('connection', function (socket) {
    socket.on('allMatches', function (data) {
        var sortedImages = matchImages.returnAllMatches(data);
        var html = htmltemplate.generateList(sortedImages);
        socket.emit('resultHTML', html);
    });
    socket.on('allMatchesNoImage', function (data) {
        var sortedImages = matchImages.returnAllMatches(data);
        socket.emit('result', sortedImages);
    });

});

app.listen(80);
app.use('/', express.static(__dirname + '/'));
