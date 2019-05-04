define('/static/components/hlcode', function(require, exports, module) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = {
      props: {
          text: {
              type: String
          },
          lang: {
              type: String
          }
      },
      template: /* template */ "\n    <pre><code v-html=\"text\" class=\"hljs\" :class=\"lang\"></code></pre>\n"
  };
  

});
