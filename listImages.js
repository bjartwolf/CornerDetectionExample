var _ = require('underscore'),
    fs = require('fs');


module.exports = function (directory) {
        var filesInVideoDir = fs.readdirSync(directory);
        var PNGfilesInVideoDir = _.filter(filesInVideoDir, function (file) {
            return file.slice(-3)  === 'png';});
        return PNGfilesInVideoDir;
};
