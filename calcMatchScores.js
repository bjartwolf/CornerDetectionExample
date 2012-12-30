var _ = require('underscore');
var matchImages = require('./matchImages.js');

var sortedImages = matchImages.oneToManyMatch('image192.js');
goodMatches = _.filter(sortedImages, function (image) {
    return image.match < 1;
});
_.each(goodMatches, function (image) {
    console.log(image.name);
});
console.log(goodMatches.length);
