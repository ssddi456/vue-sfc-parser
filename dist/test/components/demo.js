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
