var express = require('express');
var matchImages = require('./matchImages.js');

var app = express(); 
app.use(express.bodyParser());

var io = require('socket.io').listen(4000);
io.set('log level', 1);
io.sockets.on('connection', function (socket) {
    socket.on('match', function (data) {
        socket.emit('result', matchImages.match(data));
    });
});

app.listen(80);
app.use('/', express.static(__dirname + '/'));
