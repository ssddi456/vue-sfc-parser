const path = require('path');
const cp = require('child_process');
let scaffold = new (require('fis-scaffold-kernel'))({
    type: 'gitlab',
    log: {
        level: 0
    }
});


// 下载文件
// 重新编译

var repo = 'z3/z3-warehouse@master';
var template = 'templates/fe-active';
var localPath = path.join(__dirname, '../');

var folders = [
    'component',
    'common'
];

scaffold.download(repo,
    function (err, tempPath) {

        try {
            scaffold.util.del(path.join(localPath, 'dist'));
        } catch (error) { }

        //  下载模块
        folders.forEach(function (folder) {
            try {
                scaffold.util.del(path.join(localPath, folder));
            } catch (error) { }

            scaffold.util.copy(
                path.join(tempPath, template, folder),
                path.join(localPath, folder));

            const child =cp.exec('fis3 release -c', {
                env: process.env
            });
            child.stdout.pipe(process.stdout);
            child.stderr.pipe(process.stderr);
        })
    });
