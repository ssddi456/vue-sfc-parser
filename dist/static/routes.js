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
