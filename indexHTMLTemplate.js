var _ = require('underscore');
var generateList = function (imageList) {
    var htmlTemplate = "<ul id='horizlist'> <% _.each(imageList, function(image) { %> <li><p id='<%= image.id%>'> <%= image.match %> </p><image width='100px' src='http://bjartwolf.blob.core.windows.net/videos/<%= image.png%>'</li> <% }); %></ul>";
    return _.template(htmlTemplate, {'imageList' :imageList});
}

exports.generateList = generateList;
