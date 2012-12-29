var _ = require('underscore');

exports.matchCornerArrays = function (corners1, corners2) {
    // should sort them as well by priority now
    var sum = 0;
    _.each(corners1, function (corner) {
        var closestCorner = _.min(corners2, function (corner2) {
            return (Math.pow(corner.x-corner2.x,2) + Math.pow(corner.y-corner2.y,2));
        });
        var indexOfClosestCorner = _.indexOf(corners2, closestCorner);
        corners2.splice(indexOfClosestCorner,1);
        if (closestCorner == 'Infinity') {
            closestCorner = {};
            closestCorner.x = -100;
            closestCorner.y = -100;
            corner.score = 0;
            sum += 100000;
        }
        console.log(corners1);
        sum += corner.score*(Math.pow(corner.x-closestCorner.x,2) + Math.pow(corner.y-closestCorner.y,2));
   });
   console.log(corners2);
   var sumOfRest = _.reduce(corners2, function (memo, item) { 
       return memo + Math.pow(item.score,2)*1e6;
       },0)
   return (sum+sumOfRest)/1e6;
}

function getImages() {
    // should contain name of image and corners
    // returns them from disk

    return images;
}

function calculateMatchScores(imageToMatchAgainst, images) {
    _.each(images, function (image) {
        image.match = matchCornerArrays(image.corners, imageToMatchAgainst.corners);
    });
    return images;
}

var allImages = getImages();
var image = _.find(allImages, function (image) {
    return image.name === 'image192.png';
    });
var images = _.filter(allImages, function (image) {
    return image.name !== 'image192.png';
    });
var imagesWithScores = calculateMatchScores(image, images);

var sortedImages = _.sortBy(imagesWithScores, function (image) {
    return image.score;
    });

// should write the output to a static html file
// probably easier with a template-library
// user underscore to render a file
