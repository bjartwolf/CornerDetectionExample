var express = require('express');
var matchImages = require('./matchImages.js');

var app = express(); 
app.use(express.bodyParser());

var io = require('socket.io').listen(4000);

io.sockets.on('connection', function (socket) {
    socket.on('match', function (data) {
//        var image = { corners: data};
        console.log(data);
        socket.emit('result', matchImages.match(data));
    });
});

//app.post('/match', function (req, res) {
//    res.header("Access-Control-Allow-Origin", "*");
//    var imageCorners = req.body.corners;
//    if (imageCorners) {
//        var image = { corners: imageCorners};
//        res.send(matchImages.match(image));
//    } else {
//        res.send('no image');
//    }
//});
app.listen(3000);
