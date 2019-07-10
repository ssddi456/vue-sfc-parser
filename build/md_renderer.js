var highlight = require('./highlight');

var MarkdownIt = require('markdown-it');
var md = new MarkdownIt({
    highlight,
});

module.exports = md;
