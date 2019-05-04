var fs = require('fs');
var path = require('path');
var highlight = require('./highlight');
var MarkdownIt = require('markdown-it');
var md = new MarkdownIt({
    highlight,
});

module.exports = function (root) {

    var files = fs.readdirSync(root);

    var component = files.filter((x) => x == 'index.vue' || x == path.basename(root) + '.vue')[0];
    var demo = files.filter((x) => x.toLowerCase() == 'demo.vue')[0];
    var readme = files.filter((x) => x.toLowerCase() == 'readme.md')[0];

    return {
        demoComponent: component,
        code: demo && highlight(fs.readFileSync(path.join(root, demo), 'utf8'), 'html').value,
        readme: readme && md.render(fs.readFileSync(path.join(root, readme), 'utf8'))
    }
}

if (require.main == module) {
    (function () {
        var ret = module.exports(path.join(__dirname, '../test/components'));
        console.log(ret);
    })()
}