define('/static/page', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  var menu_1 = require("/static/menu");
  exports.default = {
      template: /* template */ "\n        <div>\n            Layout\n        </div>\n        "
  };
  menu_1.addMenuItem('Layout', '/layout');
  

});
