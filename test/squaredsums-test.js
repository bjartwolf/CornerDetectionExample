var buster = require('buster');
var fs = require('fs');
var matchCornerArrays = require('../matchImages.js').matchCornerArrays;

buster.testCase("Testing image difference metric", {
   "//test image 1 vs 163": function () {
        var imagedata1 = JSON.parse(fs.readFileSync('video/image1.js'));
        var imagedata2 = JSON.parse(fs.readFileSync('video/image163.js'));
        var weightedSum = matchCornerArrays(imagedata1, imagedata2);
        assert.equals(weightedSum, 100, "Hey, this should match");
     },
     "//test image 86 vs 163": function () {
        var imagedata1 = JSON.parse(fs.readFileSync('video/image86.js'));
        var imagedata2 = JSON.parse(fs.readFileSync('video/image163.js'));
        var weightedSum = matchCornerArrays(imagedata1, imagedata2);
        assert.equals(weightedSum, 100, "Hey, this should match");
     },
    "//test image 164 vs 163": function () {
        var imagedata1 = JSON.parse(fs.readFileSync('video/image164.js'));
        var imagedata2 = JSON.parse(fs.readFileSync('video/image163.js'));
        var weightedSum = matchCornerArrays(imagedata1, imagedata2);
        assert.equals(weightedSum, 100, "Hey, this should match");
     },
    "//test image 1 vs 164": function () {
        var imagedata1 = JSON.parse(fs.readFileSync('video/image1.js'));
        var imagedata2 = JSON.parse(fs.readFileSync('video/image164.js'));
        var weightedSum = matchCornerArrays(imagedata1, imagedata2);
        assert.equals(weightedSum, 100, "Hey, this should match");
     },
     "//test image 86 vs 164": function () {
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
     "//test image 164 vs itself": function () {
        // Tried to be smart, but modified the same reference... 
        // Careful
        var imagedata1 = JSON.parse(fs.readFileSync('video/image164.js'));
        var imagedata2 = JSON.parse(fs.readFileSync('video/image164.js'));
        var weightedSum = matchCornerArrays(imagedata1, imagedata2);
        assert.equals(weightedSum, 0, "It should match itself perfectly");
     }
});
