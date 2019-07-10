var md = require('./md_renderer');;

module.exports = function (content, file, options) {
    return 'module.exports = ' + JSON.stringify(md.render(content));
}
