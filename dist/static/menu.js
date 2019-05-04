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
