var _ = require('underscore');

exports.matchCornerArrays = function (corners1, corners2) {
    var sortedCorners1 = _.sortBy(corners1, function (corner) { return corner.score;});
    var nrOfCorners = sortedCorners1.length;
    var sortedCorners2 = _.sortBy(corners2, function (corner) { return corner.score;});
//    console.log("Corners1");
//    console.log(sortedCorners1);
//    console.log("Corners2");
//    console.log(sortedCorners2);

    var zippedArray = _.zip(sortedCorners1, sortedCorners2);
    var squaredWeightedSum = _.reduce(zippedArray, 
        function(memo, items) {
            var item1 = items[0];
            var item2 = items[1];
//            console.log('****');
//            console.log(item1);
//            console.log(item2);
            
            if (item1 === undefined) {
                return item2.score*(Math.pow(item2.x,2) + Math.pow(item2.y,2));
            } else if (item2 === undefined) {
                return item1.score*(Math.pow(item1.x,2) + Math.pow(item1.y,2));
            } else 
            {
                return item1.score*(Math.pow((item1.x-item2.x),2) + Math.pow((item1.y-item2.y),2));
            }
        }, 0);
    return squaredWeightedSum/1e5;
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
