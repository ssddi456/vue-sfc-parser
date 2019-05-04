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
