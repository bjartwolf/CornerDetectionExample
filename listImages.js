var _ = require('underscore'),
    fs = require('fs');

var filesInVideoDir = fs.readdirSync('video');
var PNGfilesInVideoDir = _.filter(filesInVideoDir, function (file) {
    return file.slice(-3)  === 'png';});
console.log(filesInVideoDir.length);
console.log(PNGfilesInVideoDir.length);
