var path = require('path');
var fs = require('fs');

exports.camelCase = function (str) {
    return str.replace(/\-([a-zA-Z])/g, function ($, $1) {
        return $1.toUpperCase()
    });
};


exports.getOriginContent = function (file) {
    return fis.util.read(file.realpath, file.isText());
}

exports.getSameNameDepsFile = function (file, ext) {
    if (file.ext == ext) {
        throw new Error('dont find your self. file:', file.id);
    }

    var pattern = file.subpathNoExt + '.*';
   
    var files = fis.project.getSourceByPatterns(pattern);
   
    var path;
    Object.keys(files).every(function (subpath) {
        var file = files[subpath];

        if (file.rExt === ext) {
            path = subpath;
            return false;
        }

        return true;
    });

    if (path) {
        return fis.file.wrap( fis.project.getProjectPath() + path);
    }
}


exports.getComponentFileByName = function (name) {
    const root = path.join(process.cwd(), 'component');
    const names = [
        name + '.vue',
        'index.vue',
        name + '.es',
        'index.es',
        name + '.es6',
        'index.es6',
    ];

    for (let i = 0; i < names.length; i++) {
        const element = names[i];
        const fullPath = path.join(root, name, element);
        const rPath = '/component/' + name + '/' + element;
        if (fs.existsSync(fullPath)) {
            return rPath;
        }
    }
}


exports.derivedFromFile = function (file, name, props, content) {
    var newFileName = styleFileName = file.realpathNoExt + name;
    var newFile = fis.file.wrap(newFileName);
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
