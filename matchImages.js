var _ = require('underscore');

exports.matchCornerArrays = function (corners1, corners2) {
    var squaredDistance = function (corner1, corner2) {
        return (Math.pow(corner1.x-corner2.x,2) + Math.pow(corner1.y-corner2.y,2));
    }
    var sortedCorners1 = _.sortBy(corners1, function (corner) { return 1/corner.score; });
    var leftOverCornersInCorners1 = _.last(sortedCorners1, corners1.length - corners2.length); // Is empty list if no leftovers
    // Some sick apply-stuff here. To remove the leftOverCorners they must be single arguments to the without function
    var sortedCornersWithoutUnmatched = _.without.apply(null, _.flatten([[sortedCorners1], leftOverCornersInCorners1], true)); 

    // Reduce the list by combining to the closest value
     var reducedList = _.reduce(sortedCornersWithoutUnmatched, function (memo, corner) {
        var closestCorner = _.min(memo.corners2, function (corner2) {
            return squaredDistance(corner, corner2);
        });
        memo.sum = memo.sum + corner.score*squaredDistance(corner, closestCorner);
        memo.corners2 = _.without(memo.corners2, closestCorner);
        return memo;
     },
        { sum: 0,
          corners2: corners2,
     });

   var unMatched = reducedList.corners2;

   var sumOfRest = _.reduce(unMatched, function (sum, item) { 
       return sum + item.score*1e4;
   },0)

   var sumOfFirst = _.reduce(leftOverCornersInCorners1, function (sum, item) { 
       return sum + item.score*1e4;
   },0)
   return (sumOfFirst + reducedList.sum + sumOfRest)/(1e6*corners1.length + 1);
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
