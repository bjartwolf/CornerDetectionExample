var corner = require('./corner.js');
var listImages = require('./listImages.js');
var _ = require('underscore');

var images = listImages('video');
_.each(images, function (image) {
    corner('video/' + image);
});
