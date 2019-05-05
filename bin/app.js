var express = require('express');
var path = require('path');
var app = express();

var root = path.join(__dirname, '../dist')
app.use('/', express.static(root, {
    cacheControl: true,
    etag: true,
    maxAge: 3600,
    index: ['page/index.html', 'index.html']
}));

var port = process.env.PORT || 8802;
app.listen(port, function () {
    console.log('server listen on ', port);
});
