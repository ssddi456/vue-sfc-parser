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
