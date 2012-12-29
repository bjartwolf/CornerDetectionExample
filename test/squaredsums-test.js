var buster = require('buster');
var fs = require('fs');
var _ = require('underscore');
var matchCornerArrays = require('../matchImages.js').matchCornerArrays;
var getImages = require('../matchImages.js').getImages;

buster.testCase("Testing reading from disc", {
   "test that correct nr of files are returned": function () {
       assert.equals(822, getImages('video').length); 
   },
   "test image 82": function () {
       var images = getImages('video');
       var image82 = _.find(images, function (image) {
           return image.name === 'image82.js';
       });
       assert.equals(image82.corners.length, 1); 
       assert.equals(_.first(image82.corners).x, 160); 
   }
});

buster.testCase("Testing image difference metric", {
    "test image 1 vs 163": function () {
        var imagedata1 = JSON.parse(fs.readFileSync('video/image1.js'));
        var imagedata2 = JSON.parse(fs.readFileSync('video/image163.js'));
        var weightedSum = matchCornerArrays(imagedata1, imagedata2);
        assert.equals(weightedSum, 100, "Hey, this should match");
     },
     "test image 86 vs 163": function () {
        var imagedata1 = JSON.parse(fs.readFileSync('video/image86.js'));
        var imagedata2 = JSON.parse(fs.readFileSync('video/image163.js'));
        var weightedSum = matchCornerArrays(imagedata1, imagedata2);
        assert.equals(weightedSum, 100, "Hey, this should match");
     },
    "test image 164 vs 163": function () {
        var imagedata1 = JSON.parse(fs.readFileSync('video/image164.js'));
        var imagedata2 = JSON.parse(fs.readFileSync('video/image163.js'));
        var weightedSum = matchCornerArrays(imagedata1, imagedata2);
        assert.equals(weightedSum, 100, "Hey, this should match");
     },
    "test image 1 vs 164": function () {
        var imagedata1 = JSON.parse(fs.readFileSync('video/image1.js'));
        var imagedata2 = JSON.parse(fs.readFileSync('video/image164.js'));
        var weightedSum = matchCornerArrays(imagedata1, imagedata2);
        assert.equals(weightedSum, 100, "Hey, this should match");
     },
     "test image 86 vs 164": function () {
        var imagedata1 = JSON.parse(fs.readFileSync('video/image86.js'));
        var imagedata2 = JSON.parse(fs.readFileSync('video/image164.js'));
        var weightedSum = matchCornerArrays(imagedata1, imagedata2);
        assert.equals(weightedSum, 100, "Hey, this should match");
     },
    "test image 163 vs 164": function () {
        var imagedata1 = JSON.parse(fs.readFileSync('video/image163.js'));
        var imagedata2 = JSON.parse(fs.readFileSync('video/image164.js'));
        var weightedSum = matchCornerArrays(imagedata1, imagedata2);
        assert.equals(weightedSum, 100, "Hey, this should match");
     },
     "test image 164 vs itself": function () {
        var imagedata1 = JSON.parse(fs.readFileSync('video/image164.js'));
        var weightedSum = matchCornerArrays(imagedata1, imagedata1);
        assert.equals(weightedSum, 0, "It should match itself perfectly");
     }
});
