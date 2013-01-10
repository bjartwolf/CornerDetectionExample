var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    matchImages = require('./matchImages.js'),
    htmltemplate = require('./indexHTMLTemplate.js'),
    io = require('socket.io').listen(server);

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

app.use(express.bodyParser());
app.use('/', express.static(__dirname + '/public'));
server.listen(process.env.port || 1337);
