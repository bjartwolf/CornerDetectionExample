var _ = require('underscore');
var fs = require('fs');
var getImages = function (dir) {
    // read from disc
   var files = fs.readdirSync(dir); 
    // returns them from disk
   var imageFiles = _.filter(files, function (file) { return file.slice(-2) === 'js';});
   var imagesData = _.map(imageFiles, function (imageName) {
       var id = imageName.slice(0,-3);
       var png = imageName.slice(0,-2) + "png";
       return { name: imageName,
                png: png, 
                id: id, 
                corners: JSON.parse(fs.readFileSync(dir + '/' + imageName))};
   });
   return imagesData;
}
exports.getImages = getImages;

var matchCornerArrays = function (corners1, corners2) {
    var penaltyForMissingAPoint = 1e7;
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
          corners2: corners2
     });

   var unMatched = reducedList.corners2;

   var sumOfRest = _.reduce(unMatched, function (sum, item) { 
       return sum + item.score*penaltyForMissingAPoint;
   }, 0)

   var sumOfFirst = _.reduce(leftOverCornersInCorners1, function (sum, item) { 
       return sum + item.score*penaltyForMissingAPoint;
   }, 0)
   return (sumOfFirst + reducedList.sum + sumOfRest)/(1e6*corners1.length + 1);
}
exports.matchCornerArrays = matchCornerArrays;
function calculateMatchScores(imageToMatchAgainst, images) {
    _.each(images, function (image) {
        image.match = matchCornerArrays(image.corners, imageToMatchAgainst.corners);
    });
    return images;
}
exports.oneToManyMatch = function (imageName) {

    var allImages = getImages('video');
//    var allImages = getImages('reduced_imageset');
    var image = _.find(allImages, function (image) {
        return image.name === imageName;
        });
    var images = _.filter(allImages, function (image) {
        return image.name !== imageName;
        });

    var imagesWithScores = calculateMatchScores(image, images);
    var sortedImages = _.sortBy(imagesWithScores, function (image) {
        return image.match;
        });
    return sortedImages;
}

//var images = getImages('video');
var images = getImages('reduced_imageset');
// some stupid stuff with properties in here
/// should write the output to a static html file
// probably easier with a template-library
// user underscore to render a file
var returnAllMatches = function (corners) {
    // images are cached from disk
    _.each(images, function (image) {
        image.match = matchCornerArrays(image.corners, corners.corners).toFixed(2);
    });
    var sortedImages = _.sortBy(images, function (image) {
        return image.id;
    });
    return sortedImages;
}
exports.returnAllMatches = returnAllMatches;

