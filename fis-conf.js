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
    'component/**',
]);

var lessConf = {
    rExt: 'css',
    parser: fis.plugin('less'),
    postprocessor: [
        fis.plugin('cssreset', {
            ignore: {
                no: [
                    'max-width',
                    'min-height'
                ]
            },
            regain: {
                px: [
                    'font*'
                ]
            }
        }),
        fis.plugin('autoprefixer', {
            browsers: [
                'last 3 versions',
                'chrome >= 34',
                'safari >= 10.1',
                'ios >= 10',
                'android >= 4.2']
        })
    ]
};

var parserVueComponent = {
    useCompile: true,
    useSameNameRequire: true,
    isTextLike: true,
    isJsLike: true,
    isMod: true,
    rExt: 'js',
    moduleId: '$1',
    parser: fis.plugin('vue-component', {
        runtimeOnly: false,
        styleNameJoin: '',
        extractCSS: true,
        cssScopedIdPrefix: '_v-',
        cssScopedHashType: 'sum',
        cssScopedHashLength: 8,
        cssScopedFlag: '__vuec__'
    }),
};
var jadeConfigure = {
    parser: fis.plugin('jade', {
        data: {
            comboDependencies: [
                "/content/resource/libs/vuep.js",
                "/static/agentjs/dist/2.0.0/agent.min.js",
                "/static/js/exports-lib/authorication.js",
                "/content/cashdesk/statistic.min.js",
                "/static/cdn-libs/fastclick/1.0.6/fastclick.min.js",
                "/static/cdn-libs/vue/2.5.21/vue.min.js"
            ]
        }
    }),
};

var jsConfigure = {
    parser: fis.plugin('typescript'),
    isTextLike: true,
    isJsLike: true,
    isMod: true,
};

fis
    .match('**.jade', {
        parser: jadeConfigure.parser,
        rExt: '.html',
        isHtmlLike: true,
        isPage: true,
    })
    .match('/{page,component}/**/*.jade', {
        parser: jadeConfigure.parser,
    })
    .match('/{page,component}/**/*.jade:js', {
        parser: [fis.plugin('typescript', {
            module: 0,
            target: 0
        }), function (str) {
            const lines = str.split(/\n|\r\n/g);
            if (lines[0] == '"use strict";') {
                return lines.slice(2).join('\n');
            }
            return str;
        }]
    })
    .match('**.less', {
        parser: fis.plugin('less'),
        rExt: '.css',
        isCssLike: true,
        isTextLike: true,
    })
    .match('(**).vue', parserVueComponent)
    .match('(**).vue:js', jsConfigure)
    .match('(**).vue:less', {
        parser: fis.plugin('less'),
    })

    .match('component/(**).vue:less', lessConf)
    .match('/component/**/demo.vue', Object.assign(
        Object.assign({}, parserVueComponent), {
            parser: [
                parserVueComponent.parser,
                require('./build/demo-loader')
            ]
        }
    ))

    .match('(**).vue:pug', jadeConfigure)
    .match('(**).vue:jade', jadeConfigure)
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
    .match('/component/**/*.{ts,es6}', {
        isJsLike: true,
        rExt: 'js',
        isTextLike: true,
        isMod: true,
        parser: fis.plugin('typescript', {
            allowSyntheticDefaultImports: true
        }),
    })
    .match('/common/**.md', {
        rExt: 'js',
        isJsLike: true,
        isTextLike: true,
        isMod: true,
        parser: require('./build/compile_md')
    })
    .match('dist/**', {
        release: false
    })

fis.unhook('components');
fis.hook(require('./build/hook'), {
    root: 'component/'
});

fis.hook('commonjs', {
    extList: ['.js', '.jsx', '.es', '.es6', '.ts', '.tsx', '.vue']
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
        deploy: [fis.plugin('local-deliver', {
            to: './dist'
        })], // 发布到本地，由 -d 参数制定目录
    });
