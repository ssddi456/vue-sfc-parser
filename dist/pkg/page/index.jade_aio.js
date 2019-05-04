define('/static/menu', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  function routerChange(to, from) {
      1;
      exports.links.forEach(function (item) {
          item.current = item.path == to.path;
          if (item.hasChildren) {
              item.children.forEach(function (item) { return item.current = item.path == to.path; });
              if (item.path == to.path || item.children.some(function (item) { return item.path == to.path; })) {
                  item.childrenIsCurrent = true;
                  item.showChildren = true;
              }
              else {
                  item.childrenIsCurrent = false;
                  item.showChildren = false;
              }
          }
      });
  }
  exports.routerChange = routerChange;
  function addMenuItem(name, path, parent) {
      if (parent === void 0) { parent = exports.links; }
      parent.push({ name: name, path: path, hasChildren: false, showChildren: false, children: [] });
  }
  exports.addMenuItem = addMenuItem;
  ;
  function addMenuListItem(name, path) {
      var children = [];
      exports.links.push({ name: name, path: path, hasChildren: true, showChildren: false, children: children });
      return {
          addChild: function (name, path) {
              addMenuItem(name, path, children);
          }
      };
  }
  exports.addMenuListItem = addMenuListItem;
  exports.links = [];
  

});

define('/static/welcome', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var menu_1 = require("/static/menu");
  exports.default = {
      template: /* template */ "\n        <div>\n            welcome\n        </div>\n        "
  };
  menu_1.addMenuItem('Welcome', '/welcome');
  

});

define('/static/page', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var menu_1 = require("/static/menu");
  exports.default = {
      template: /* template */ "\n        <div>\n            Page\n        </div>\n        "
  };
  menu_1.addMenuItem('Page', '/page');
  

});

define('/test/components/components', function(require, exports, module) {

  "use strict";
  //
  //
  //
  //
  //
  //
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = {
      data: function () {
          return {};
      },
      props: {
          /**
           * a simple id
           */
          id: {
              type: String,
              required: true
          }
      },
      methods: {
          /**
           *
           */
          test: function () {
              /**
               * a simple event
               */
              this.$emit("simple_event", "test");
          }
      }
  };
  
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "<div class=\"test\"><slot>default</slot></div>"
  __vue__options__._scopeId = "_v-c7945420"
  

});

define('/test/components/demo', function(require, exports, module) {

  "use strict";
  //
  //
  //
  //
  //
  Object.defineProperty(exports, "__esModule", { value: true });
  var components_1 = require("/test/components/components");
  exports.default = {
      components: {
          test: components_1.default
      }
  };
  
  var __vue__options__;
  if(exports && exports.__esModule && exports.default){
    __vue__options__ = exports.default;
  }else{
    __vue__options__ = module.exports;
  }
  __vue__options__.template = "<test :id=\"'useless'\"><slot name=\"default\">test demo</slot></test>"
  

});

define("/component-info", function() { return {"components":{"name":"components","componentDemoId":"/test/components/demo","demoCode":"<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">template</span> <span class=\"hljs-attr\">lang</span>=<span class=\"hljs-string\">\"pug\"</span>&gt;</span>\n    test(:id=\"'useless'\")\n        slot(name=\"default\")\n            | test demo\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">template</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">script</span>&gt;</span><span class=\"undefined\"></span>\n<span class=\"javascript\"><span class=\"hljs-keyword\">import</span> test <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'./components'</span>;</span>\n<span class=\"undefined\"></span>\n<span class=\"javascript\"><span class=\"hljs-keyword\">export</span> <span class=\"hljs-keyword\">default</span> {</span>\n<span class=\"undefined\">    components: {</span>\n<span class=\"undefined\">        test: test</span>\n<span class=\"undefined\">    }</span>\n<span class=\"undefined\">}</span>\n<span class=\"undefined\"></span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">script</span>&gt;</span>\n","readme":"<h2>test</h2>\n<p>this is some description</p>\n","info":{"name":null,"description":null,"keywords":[],"slots":[{"kind":"slot","visibility":"public","description":"","keywords":[],"name":"default","props":[]}],"props":[{"kind":"prop","visibility":"public","description":"a simple id","keywords":[],"name":"id","type":"String","nativeType":"__undefined__","default":"__undefined__","required":true,"describeModel":false}],"data":[],"computed":[],"events":[{"kind":"event","visibility":"public","description":"a simple event","keywords":[],"name":"simple_event","arguments":[]}],"methods":[{"kind":"method","visibility":"public","description":"","keywords":[],"name":"test","params":[],"return":{"type":"void","description":null}}]}}}})
define('/static/component', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var menu_1 = require("/static/menu");
  var componentInfos = require("/component-info");
  var defaultComponentId = 'index';
  var index = {
      template: "<div>index</div>"
  };
  var loading = {
      template: "<div>loading...</div>"
  };
  var error = {
      template: "<div>error</div>"
  };
  console.log(componentInfos);
  exports.default = {
      data: function () {
          return {
              componentId: this.$route.params.componentId || defaultComponentId,
              demoComponent: loading,
              componentReadme: '',
              demoCode: '',
              readme: '',
              info: undefined
          };
      },
      created: function () {
          this.loadComponent();
      },
      beforeRouteUpdate: function (to, from, next) {
          this.componentId = to.params.componentId || defaultComponentId;
          this.loadComponent();
          return next();
      },
      methods: {
          loadComponent: function () {
              var _this = this;
              var currentComponentInfo = componentInfos[this.componentId];
              if (currentComponentInfo) {
                  require([currentComponentInfo.componentDemoId], function (demo) {
                      _this.demoComponent = demo.default;
                      _this.demoCode = currentComponentInfo.demoCode;
                      _this.readme = currentComponentInfo.readme;
                      _this.info = currentComponentInfo.info;
                  });
              }
              else {
                  this.demoComponent = index;
                  this.demoCode = '';
                  this.readme = '';
                  this.info = undefined;
              }
          }
      },
      watch: {
          componentId: function () {
          }
      },
      template: /* template */ "\n        <div>\n            <h1>{{componentId}}</h1>\n            <h2>demo</h2>\n            <div class=\"demo-component\">\n                <div class=\"demo-component-wrapper dc-card\">\n                    <component :is=\"demoComponent\"></component>\n                </div>\n            </div>\n            <h2>demo code</h2>\n            <pre><code class=\"hljs\" v-html=\"demoCode\"></code></pre>\n\n            <div v-html=\"readme\"></div>\n            <div v-if=\"info\">\n                <h2>props</h2>\n                <div v-for=\"(item) in info.props\">\n                    <h3>{{item.name}}</h3>\n                    <p>{{item.description}}</p>\n                </div>\n                <h2>slots</h2>\n                <div v-for=\"(item) in info.slots\">\n                    <h3>{{item.name}}</h3>\n                    <p>{{item.description}}</p>\n                </div>\n                <h2>events</h2>\n                <div v-for=\"(item) in info.events\">\n                    <h3>{{item.name}}</h3>\n                    <p>{{item.description}}</p>\n                </div>\n                <h2>methods</h2>\n                <div v-for=\"(item) in info.methods\">\n                    <h3>{{item.name}}</h3>\n                    <p>{{item.description}}</p>\n                </div>\n            </div>\n        </div>\n        "
  };
  var componentItem = menu_1.addMenuListItem('Component', '/component');
  Object.keys(componentInfos).forEach(function (name) {
      componentItem.addChild(name, '/component/' + name);
  });
  

});

define('/static/routes', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var vue_router_1 = require("vue-router");
  var welcome_1 = require("/static/welcome");
  var page_1 = require("/static/page");
  var component_1 = require("/static/component");
  var menu_1 = require("/static/menu");
  exports.routes = [
      {
          path: '/welcome', component: welcome_1.default,
      },
      {
          path: '/page', component: page_1.default
      },
      {
          path: '/component', component: component_1.default,
          children: [
              { path: ':componentId', name: 'component', component: component_1.default }
          ]
      },
      { path: '*', redirect: '/welcome' }
  ];
  exports.router = new vue_router_1.default({
      routes: exports.routes
  });
  exports.router.afterEach(menu_1.routerChange);
  

});

define('/static/doc', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var vue_1 = require("vue");
  var menu_1 = require("/static/menu");
  var routes_1 = require("/static/routes");
  new vue_1.default({
      router: routes_1.router,
      el: '#main',
      data: {
          collapsed: false,
          sidebarCollapsed: false,
          links: menu_1.links,
      },
      methods: {
          toggleMenu: function (collapsed) {
              if (collapsed === void 0) { collapsed = false; }
              this.collapsed = collapsed;
          },
          toggleSideMenu: function () {
              this.sidebarCollapsed = !this.sidebarCollapsed;
          }
      }
  });
  

});

