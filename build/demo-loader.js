const util = require('./util');
const pugParser = require('./pug-parser');

const demoPagePug = `
extends ../../common/layout

block css
block main
    demo
block afterscript
    script(src='./demo')
    script.
        import demo from './demo';
        new Vue({
            el: '#root',
            components: {
                demo: demo
            }
        });
`;

module.exports = function (content, file) {
    if (file.basename == 'demo.vue') {
        const code = pugParser.updatePugPage(demoPagePug, file, {
            loadSameNameRequire: false,
            foundedComponent: [{
                componentPath: file.subpath
            }]
        });
        util.derivedFromFile(file, '-preview.jade', {}, code);
    }
    return content;
}
