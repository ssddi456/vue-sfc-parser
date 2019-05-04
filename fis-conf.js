fis.set('project.ignore', [
    'node_modules/**',
    'dist/**',
    '.git/**',
    'fis-conf.js',
]);

fis.set('project.fileType.text', 'vue, md, ts, tsx');
fis.set('project.files', [
    'page/**',
    'static/**',
    'fonts/**',
    'pkg/**',
    'test/**',
]);


fis
    .match('**.jade', {
        parser: fis.plugin('jade'),
        rExt: '.html',
        isHtmlLike: true,
        isPage: true,
    })
    .match('**.less', {
        parser: fis.plugin('less'),
        rExt: '.css',
        isCssLike: true,
        isTextLike: true,
    })
    .match('(**).vue', {
        useCompile: true,
        useSameNameRequire: true,
        isTextLike: true,
        isJsLike: true,
        isMod: true,
        rExt: 'js',
        moduleId: '$1',
        parser: fis.plugin('vue-component', {
            runtimeOnly: false,
        }),
    })
    .match('(**).vue:js', {
        parser: fis.plugin('typescript'),
        isTextLike: true,
        isJsLike: true,
        isMod: true,
    })
    .match('(**).vue:less', {
        parser: fis.plugin('less'),
    })
    .match('(**).vue:pug', {
        parser: fis.plugin('jade'),
    })
    .match('(**).vue:jade', {
        parser: fis.plugin('jade'),
    })
    .match('(**).ts', {
        isJsLike: true,
        rExt: 'js',
        isTextLike: true,
        moduleId: '$1',
        isMod: true,
        parser: fis.plugin('typescript', {
            allowSyntheticDefaultImports: true
        }),
    })
    .match('dist/**', {
        release: false
    })

fis.unhook('components');
fis.hook(require('./build/hook'));
fis.hook('commonjs', {
    extList: ['.js', '.jsx', '.es', '.ts', '.tsx', '.vue']
});

fis.match('::package', {
    postpackager: fis.plugin('loader', {
        allInOne: true,
        useInlineMap: true,
        includeAsyncs: true
    })
});

fis
    .match('*', {
        domain: 'file:///D:/gitchunk/vue-sfc-parser/dist',
        deploy: fis.plugin('local-deliver', {
            to: './dist'
        }), // 发布到本地，由 -d 参数制定目录
    });