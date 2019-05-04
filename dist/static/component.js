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
