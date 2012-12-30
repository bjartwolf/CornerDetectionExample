var _ = require('underscore');
var fs = require('fs');
var matchImages = require('./matchImages.js');
var htmltemplate = require('./indexHTMLTemplate.js');

var sortedImages = matchImages.oneToManyMatch('image192.js');
goodMatches = _.filter(sortedImages, function (image) {
    return image.match < 1;
});
//_.each(goodMatches, function (image) {
//    console.log(image.name);
//});
var html = htmltemplate.generateList(sortedImages);
fs.writeFile('index.html', '<html>'+ html + '</html>');
