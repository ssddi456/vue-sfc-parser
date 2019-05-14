const pugLexer = require('pug-lexer');
const pugParser = require('pug-parser');
const pugSourceGen = require('pug-source-gen');
const pugWalk = require('pug-walk');
const util = require('./util');
const parse5 = require('parse5');
const ts = require('typescript');
const path = require('path');

exports.parsePugPageInfo = function (code) {
    const tagNames = {};

    pugWalk(createAst(code), function before(node, replace) {
        if (node.type == 'Tag') {
            tagNames[node.name] = 1;
        }
    });

    const foundedComponent = Object.keys(tagNames).map(function (tagName) {
        const file = util.getComponentFileByName(tagName);
        if (file) {
            return {
                name: tagName,
                camelCase: util.camelCase(tagName),
                componentPath: file,
            };
        }
    }).filter(Boolean);

    return {
        foundedComponent: foundedComponent,
    };
}


exports.updatePugPage = function (code, file, options) {
    options = Object.assign({
        loadSameNameRequire: true,
        foundedComponent: []
    }, options);

    var jsBlock;
    var cssBlock;
    const tagNames = {};

    var ast = createAst(code);

    pugWalk(ast, function before(node) {
        if (node.type == 'Tag') {
            tagNames[node.name] = 1;
        }
        if (node.type == 'NamedBlock') {
            if (node.name == 'script') {
                jsBlock = node;
            } else if (node.name == 'css') {
                cssBlock = node;
            }
        }
    });


    const foundedComponent = Object.keys(tagNames).map(function (tagName) {
        const file = util.getComponentFileByName(tagName);
        if (file) {
            return {
                name: tagName,
                camelCase: util.camelCase(tagName),
                componentPath: file,
            };
        }
    }).filter(Boolean);
    // 这里应该解析出组件的依赖关系
    var jsdeps = {};
    var cssdeps = {};

    foundedComponent.concat(options.foundedComponent).forEach(function (componentInfo) {
        var info = getComponentDeps(componentInfo);
        for (let i = 0; i < info.cssdeps.length; i++) {
            const element = info.cssdeps[i];
            cssdeps[element] = 1;
        }
        for (let i = 0; i < info.jsdeps.length; i++) {
            const element = info.jsdeps[i];
            jsdeps[element] = 1;
        }
    });


    const jsCode = Object.keys(jsdeps).map(function (deps) {
        return 'script(src="' + deps + '")';
    });

    if (options.loadSameNameRequire) {
        const sameNameJs = util.getSameNameDepsFile(file, '.js');
        if (sameNameJs) {
            jsCode.push('script(src ="./' + sameNameJs.basename + '")');
            jsCode.push('script.');
            jsCode.push('    require("./' + sameNameJs.basename + '");');
        }
    }

    if (jsBlock) {
        const insertedJsContent = createAst(jsCode.join('\n'));
        insertedJsContent.nodes.forEach(function (node) {
            jsBlock.nodes.push(node);
        });
    } else {
        const insertedJsContent = createAst(
            ['block script'].concat(jsCode.map(function (line) {
                return '    ' + line
            })).join('\n')
        );
        insertedJsContent.nodes.forEach(function (node) {
            ast.nodes.push(node);
        });
    }



    const cssCode = Object.keys(cssdeps).map(function (deps) {
        return 'link(rel="stylesheet",href="' + deps + '")';
    });

    if (options.loadSameNameRequire) {
        const sameNameCss = util.getSameNameDepsFile(file, '.css');
        if (sameNameCss) {
            cssCode.push('link(rel="stylesheet", href="./' + sameNameCss.basename + '")');
        }
    }

    if (cssBlock) {
        const insertedCssContent = createAst(cssCode.join('\n'));
        insertedCssContent.nodes.forEach(function (node) {
            cssBlock.nodes.push(node);
        });
    } else {
        const insertedCssContent = createAst(
            ['block css'].concat(cssCode.map(function (line) {
                return '    ' + line
            })).join('\n')
        );
        insertedCssContent.nodes.forEach(function (node) {
            ast.nodes.push(node);
        });
    }
    const newSource = pugSourceGen(ast);

    return newSource;
}



function createAst(code) {
    const name = 'temp.jade';
    const tokens = pugLexer(code, { filename: name });
    const ast = pugParser(tokens, { filename: name });

    return ast;
}

const depsInfoMap = {};

function getComponentDeps(componentFile, useCache) {
    if (useCache === undefined) {
        useCache = true;
    }

    if (useCache) {
        if (depsInfoMap[componentFile.componentPath]) {
            const nodeInfo = depsInfoMap[componentFile.componentPath];
            const cacheJsdeps = [].concat(nodeInfo.jsdeps);
            const cacheCssdeps = [].concat(nodeInfo.cssdeps);

            if (nodeInfo.jsImports.length) {
                nodeInfo.jsImports.forEach(function (importPath) {
                    if (path.extname(importPath).length == 0) {
                        importPath += '.vue';
                    }
                    const nodeInfo = getComponentDeps({
                        componentPath: importPath
                    });
                    nodeInfo.jsdeps.forEach(function (dep) {
                        cacheJsdeps.push(dep);
                    });
                    nodeInfo.cssdeps.forEach(function (dep) {
                        cacheCssdeps.push(dep);
                    });
                });
            }

            return {
                jsdeps: cacheJsdeps,
                cssdeps: cacheCssdeps
            };
        }
    }

    const findFile = fis.project.getSourceByPatterns(componentFile.componentPath)[componentFile.componentPath];
    if (!findFile) {
        console.log(componentFile.componentPath, 'could not be found');
        return {
            jsdeps: [],
            cssdeps: []
        };
    }

    const code = util.getOriginContent(findFile);

    const dom = parse5.parseFragment(code);
    const cssdeps = [];
    const jsdeps = [];
    const jsImports = [];

    dom.childNodes.forEach(function (node) {

        if (node.tagName == 'link') {
            if (node.attrs.some(function (attr) {
                return attr.name == 'rel' && attr.value == 'stylesheet';
            })) {
                for (let i = 0; i < node.attrs.length; i++) {
                    const element = node.attrs[i];
                    if (element.name == 'href' && element.value.match(/^http[s]\:\/\//)) {
                        cssdeps.push(element.value);
                    }
                }
            }
        } else if (node.tagName == 'script') {
            for (let i = 0; i < node.attrs.length; i++) {
                const element = node.attrs[i];
                if (element.name == 'src' && element.value.match(/^http[s]\:\/\//)) {
                    jsdeps.push(element.value);
                }
            }

            if (node.childNodes && node.childNodes.length) {
                const script = node.childNodes[0].value;
                if (script.length) {
                    getAllComponentImports(componentFile.componentPath, script)
                        .forEach(function (importPath) {
                            jsImports.push(importPath);
                        });
                }
            }
        }
    });

    const ret = {
        cssdeps: cssdeps,
        jsdeps: jsdeps,
        jsImports: jsImports,
    };
    depsInfoMap[componentFile.componentPath] = ret;
    return ret;
}

exports.getComponentDeps = getComponentDeps;

exports.getAllComponentDeps = function () {
    return depsInfoMap;
}


/**
 * 读取组件的 imports 信息
 * @param {string} filePath 
 * @param {string} script
 */
function getAllComponentImports(filePath, script) {
    const ret = [];

    const sourceFile = ts.createSourceFile('test.ts', script, ts.ScriptTarget.ES5);

    sourceFile.statements.forEach(function (statment) {
        if (statment.kind == ts.SyntaxKind.ImportDeclaration) {
            const modulePath = statment.moduleSpecifier.text;
            if (modulePath[0] == '/') {
                ret.push(modulePath);
            } else {
                ret.push(path.join(path.dirname(filePath), modulePath).replace(/\\/g, '/'));
            }
        }
    });

    return ret;
}
