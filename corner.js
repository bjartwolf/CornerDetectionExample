var fs = require('fs'),
    PNG = require('pngjs').PNG,
    async = require('async'),
    jsfeat = require('jsfeat'),
    _ = require('underscore');


// Takes a filename (should be png)
// and writes a jsonfile with same name with corners
module.exports = function (filename) {
fs.createReadStream(filename)
    .pipe(new PNG({
        // Haven't bothered looking into this, here's what it means
        // http://www.w3.org/TR/PNG-Filters.html
        filterType: 4
    }))
    .on('parsed', function() {
        var self = this;
        var grayImg = new jsfeat.matrix_t(this.width,this.height, jsfeat.U8_t | jsfeat.C1_t);

        jsfeat.imgproc.grayscale(this.data, grayImg.data);
        jsfeat.fast_corners.set_threshold(50);
        var corners = [], border = 3;

        // Should preallocated array according to jsfeat docs
        for (var i = 0; i < this.height*this.width; ++i) {
            corners[i] = new jsfeat.point2d_t(0,0,0,0);
        }

        // Detects corners in the gray Image, stores them in the corners object
        // Returns nr. of found corners
        var count = jsfeat.fast_corners.detect(grayImg, corners, border);

        var non_null_corners = _.filter(corners, function (corner) {
           return corner.score > 0;
        });

       fs.writeFile(filename.slice(0,-4) + '.js', JSON.stringify(non_null_corners, null, 4));

        // Creates a blue dot in each corner
//        _.each(non_null_corners, function (corner) {
//            var idx = (self.width*corner.y + corner.x) << 2;
//            self.data[idx] = 0;    // R
//            self.data[idx+1] = 0;  // G
//            self.data[idx+2] = 255;// B
//            self.data[idx+3] = 255;// Alpha (transparency)
//        });
//
//        this.pack().pipe(fs.createWriteStream('out.png'));
    });
};
