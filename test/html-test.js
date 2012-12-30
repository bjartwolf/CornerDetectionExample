var buster = require('buster');
var fs = require('fs');
var _ = require('underscore');
var matchImage = require('../matchImages.js');
var htmltemplate = require('../indexHTMLTemplate.js');

buster.testCase("Testing the html generation", {
   "Template should generate html": function () {
        var sortedImages = matchImage.oneToManyMatch('image192.js');
        goodMatches = _.filter(sortedImages, function (image) {
            return image.match < 1;
        });
        var html = htmltemplate.generateList(goodMatches);
        assert.equals(html.length, 3057, "should be lots of characters in here"); 
   },
});

