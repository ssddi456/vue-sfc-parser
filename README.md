# vue-sfc-parser

extract sfc info then create a document site.

base on one of [hexo theme](https://zalando-incubator.github.io/hexo-theme-doc/index.html),


## structure

somethings like
```
\index
    \instroduce
        \common
        \share
        \mgm
    \components
        \demoshow
            \demo-framework
                \lib
                \mini-framework
        \democode
        \apis
```
```
-------------------------------------------
|          |                  |           |
|          |                  |           |
|          |                  | * * * *   |
|          |                  |           |
| menu     |       doc        |  demo     |
|          |                  |           |
|          |                  |           |
|          |                  |           |
|          |                  |           |
|          |                  |           |
-------------------------------------------
```
menu 
```
{
    sections: [{
        name: 'xxxx',
        type: 'page' | 'anchor' ,
        href: '/xxx',
        child: [{
            
        }]
    }]
}
```
component info
```
{
    source: {
        component: 'source-file',
        demo: {
            template: 'string',
            js: 'string',
            css: 'string',
        }
    },
    api: {
        props: [],
        events: [],
        slots: []
    }
}
```