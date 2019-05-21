var path = require('path');
var highlight = require('./highlight');
var vuedoc = require("@vuedoc/parser");
var parse = vuedoc.parse;
var Loader = vuedoc.Loader;
var pug = require('pug');
var deasync = require('deasync');
var pugParser = require('./pug-parser');

var MarkdownIt = require('markdown-it');
var md = new MarkdownIt({
    highlight,
});

module.exports = function (fis, options) {
    var logAllEvent = false;
    //  logAllEvent = true;
    var root = options.root || 'test/';
    var componentInfoFileName = options.componentInfoFileName || 'component-info.ts';

    var componentFileSubpath = '/static/component.ts';
    var componentsInfoFileName = fis.project.getProjectPath(componentInfoFileName);
    var componentsInfoSubpath = '/' + componentInfoFileName;

    if (logAllEvent) {
        var oldEmit = fis.emit;
        var newEmit = function (key, val) {
            console.log('key', key);
            return oldEmit.call(fis, key, val);
        }
        fis.emit = newEmit;
    }

    fis.on('release:start', function (res) {
        Object.keys(res.src).forEach(function (subpath) {
            const file = res.src[subpath];
            if (subpath.indexOf('/component/') == 0 && file.ext == '.vue') {
                pugParser.getComponentDeps({
                    componentPath: subpath,
                }, false);
            }
        });
    });

    fis.on('compile:start', function (file) {
        if (file.id.indexOf(root) == 0) {
            var componentPathSeg = file.id.split('/');
            if (componentPathSeg.length == 3) {
                var componentName = componentPathSeg[1];
                var basename = path.basename(file.id).toLowerCase();
                var content = file.getContent();

                if (basename == 'demo.vue') {
                    derivedFromFile(file, '-highlightcode.html', {}, highlight(content, 'html').value);
                } else if (basename == 'readme.md') {
                    derivedFromFile(file, '-readme.html', {}, md.render(content));
                } else if (basename == componentName + '.vue') {
                    (function (newFile) {
                        var parsed = false;
                        parseComponentInfo(content, function (info) {
                            newFile.setContent(JSON.stringify(info));
                            parsed = true;
                        });
                        deasync.loopWhile(() => !parsed);
                    })(derivedFromFile(file, '-info.json', {}, '{}'));
                }
            }
        } else if (file.subpath == componentFileSubpath) {
            var componentsInfoFile = fis.file.wrap(componentsInfoFileName);
            componentsInfoFile.setContent('{}');
            file.derived.push(componentsInfoFile);
        }
    });
    fis.on('packager', function (ret) {

        var componentMap = {};
        var moreRequires = [];
        function getComponentInfo(name) {
            return componentMap[name] || (componentMap[name] = {
                name: name,
                componentDemoId: undefined,
                demoCode: undefined,
                readme: undefined,
                info: undefined,
            });
        }
        Object.keys(ret.src).forEach(function (id) {
            if (id.indexOf(root) === 1) {
                var componentPathSeg = id.split('/');

                if (componentPathSeg.length === 4) {
                    var componentName = componentPathSeg[2];
                    var componentInfo = getComponentInfo(componentName);
                    var basename = path.basename(id).toLowerCase();
                    var file = ret.src[id];
                    var content = file.getContent();
                    if (basename === 'demo.vue') {
                        componentInfo.componentDemoId = file.moduleId;
                    } else if (basename === 'demo-highlightcode.html') {
                        componentInfo.demoCode = content;
                    } else if (basename === 'readme-readme.html') {
                        componentInfo.readme = content;
                    } else if (basename === componentName + '-info.json') {
                        componentInfo.info = JSON.parse(content);
                    }
                }
            }
        });

        var componentsInfoFile = ret.src[componentsInfoSubpath];
        componentsInfoFile.setContent('define("' + componentsInfoFile.moduleId + '", function() { return ' + JSON.stringify(componentMap) + '})');
        moreRequires.push(componentsInfoFile.id);

        for (let i = 0; i < moreRequires.length; i++) {
            const element = moreRequires[i];
            if (ret.src[componentFileSubpath].requires.indexOf(element) == -1) {
                ret.src[componentFileSubpath].requires.push(element);
            }
        }

        return ret;
    });

}


function derivedFromFile(file, name, props, content) {
    const newFileName = file.realpathNoExt + name;
    const newFile = fis.file.wrap(newFileName);
    newFile.cache = file.cache;

    for (const key in props) {
        if (props.hasOwnProperty(key)) {
            const element = props[key];
            newFile[key] = element;
        }
    }

    newFile.setContent(content);
    fis.compile.process(newFile);
    newFile.links.forEach(function (derived) {
        file.addLink(derived);
    });

    file.derived.push(newFile);

    return newFile;
}

function parseComponentInfo(code, callback) {
    function PugLoader(options) {
        return {
            load(source) {
                const outputText = pug.render(source);
                options.source.template = outputText;
                // don't forget the return here
                return Promise.resolve();
            }
        };
    }

    parse({
        filecontent: code,
        loaders: [
            /**
             * Register TypeScriptLoader
             * Note that the name of the loader is either the extension
             * of the file or the value of the attribute `lang`
             */
            Loader.extend('pug', PugLoader),
            Loader.extend('jade', PugLoader),
        ]
    }).then(callback);
}
