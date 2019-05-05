import { addMenuItem, addMenuListItem, } from "./menu";
import Vue = require("vue");
import componentInfos = require('/component-info');


interface ComponentInfo {
    name: string,
    componentDemoId: string,
    demoCode: string,
    readme: string,
    info: {}
}
const defaultComponentId = 'index';
const index = {
    template: `<div>index</div>`
}
const loading = {
    template: `<div>loading...</div>`
};
const error = {
    template: `<div>error</div>`
};

console.log(componentInfos);

export default {
    data() {
        return {
            componentId: this.$route.params.componentId || defaultComponentId,
            demoComponent: loading,
            componentReadme: '',
            demoCode: '',
            readme: '',
            info: undefined
        };
    },
    created() {
        this.loadComponent();
    },
    beforeRouteUpdate(to, from, next) {
        this.componentId = to.params.componentId || defaultComponentId;
        this.loadComponent();
        return next();
    },
    methods: {
        loadComponent() {
            const currentComponentInfo: ComponentInfo = componentInfos[this.componentId];
            if (currentComponentInfo) {
                (
                    (require as any) as (moduleId: string[], moduleHandler: (module: { default: {} }) => void) => void
                )([currentComponentInfo.componentDemoId], (demo) => {
                    this.demoComponent = demo.default;
                    this.demoCode = currentComponentInfo.demoCode;
                    this.readme = currentComponentInfo.readme;
                    this.info = currentComponentInfo.info;
                });
            } else {
                this.demoComponent = index;
                this.demoCode = '';
                this.readme = '';
                this.info = undefined;
            }
        }

    },
    watch: {
        componentId() {

        }
    },
    template: /* template */ `
        <div>
            <h1>{{componentId}}</h1>
            <h2>demo</h2>
            <div class="demo-container">
                <div class="demo-component">
                    <div class="dc-card" style="padding:0">
                        <div class="demo-component-wrapper">
                            <component :is="demoComponent"></component>
                        </div>
                    </div>
                </div>
                <div class="demo-code">
                    <pre style="margin:0"><code class="hljs" v-html="demoCode"></code></pre>
                </div>
            </div>
            <div v-html="readme"></div>
            <div v-if="info">
                <h2>props</h2>
                <div v-for="(item) in info.props">
                    <h3>{{item.name}}</h3>
                    <p>{{item.description}}</p>
                </div>
                <h2>slots</h2>
                <div v-for="(item) in info.slots">
                    <h3>{{item.name}}</h3>
                    <p>{{item.description}}</p>
                </div>
                <h2>events</h2>
                <div v-for="(item) in info.events">
                    <h3>{{item.name}}</h3>
                    <p>{{item.description}}</p>
                </div>
                <h2>methods</h2>
                <div v-for="(item) in info.methods">
                    <h3>{{item.name}}</h3>
                    <p>{{item.description}}</p>
                </div>
            </div>
        </div>
        `
};

const componentItem = addMenuListItem('Component', '/component');
Object.keys(componentInfos).forEach(function (name) {
    componentItem.addChild(name, '/component/' + name);
});
