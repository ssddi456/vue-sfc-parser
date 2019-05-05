define("/component-info", function() { return {"components":{"name":"components","componentDemoId":"/test/components/demo","demoCode":"<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">template</span> <span class=\"hljs-attr\">lang</span>=<span class=\"hljs-string\">\"pug\"</span>&gt;</span>\n    test(:id=\"'useless'\")\n        slot(name=\"default\")\n            | test demo\n<span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">template</span>&gt;</span>\n<span class=\"hljs-tag\">&lt;<span class=\"hljs-name\">script</span>&gt;</span><span class=\"undefined\"></span>\n<span class=\"javascript\"><span class=\"hljs-keyword\">import</span> test <span class=\"hljs-keyword\">from</span> <span class=\"hljs-string\">'./components'</span>;</span>\n<span class=\"undefined\"></span>\n<span class=\"javascript\"><span class=\"hljs-keyword\">export</span> <span class=\"hljs-keyword\">default</span> {</span>\n<span class=\"undefined\">    components: {</span>\n<span class=\"undefined\">        test: test</span>\n<span class=\"undefined\">    }</span>\n<span class=\"undefined\">}</span>\n<span class=\"undefined\"></span><span class=\"hljs-tag\">&lt;/<span class=\"hljs-name\">script</span>&gt;</span>\n","readme":"<h2>test</h2>\n<p>this is some description</p>\n","info":{"inheritAttrs":true,"name":null,"description":null,"keywords":[],"slots":[{"kind":"slot","visibility":"public","description":"","keywords":[],"name":"default","props":[]}],"props":[{"kind":"prop","visibility":"public","description":"a simple id","keywords":[],"name":"id","type":"String","nativeType":"string","default":"__undefined__","required":true,"describeModel":false}],"data":[],"computed":[],"events":[{"kind":"event","visibility":"public","description":"a simple event","keywords":[],"name":"simple_event","arguments":[]}],"methods":[{"kind":"method","visibility":"public","description":"","keywords":[],"name":"test","params":[],"return":{"type":"void","description":null}}]}}}})