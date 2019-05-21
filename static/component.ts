import { addMenuItem, addMenuListItem, } from "./menu";
import Vue = require("vue");
import componentInfos = require('/component-info');
import hlcode from "./components/hlcode";
import tab from "./components/tab";


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
            demoUrl: '',
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
                this.demoUrl = `/component/${this.componentId}/demo-preview.html`;
                this.demoCode = currentComponentInfo.demoCode;
                this.readme = currentComponentInfo.readme;
                this.info = currentComponentInfo.info;
            } else {
                this.demoUrl = '';
                this.demoCode = '';
                this.readme = '';
                this.info = undefined;
            }
        }

    },
    components: {
        index,
        hlcode,
        tab,
    },
    template: /* template */ `
        <div>
            <index v-if="componentId== 'index'"></index>
            <div v-else>
                <h1>{{componentId}}</h1>
                <tab :titles="['demo', 'doc']">
                    <template v-slot:title="title">
                        {{ title.text }}
                    </template>
                    <template v-slot:body="body">
                        <div class="demo-container" v-if="body.currentIndex == 0">
                            <div class="demo-component">
                                <div class="dc-card" style="padding:0">
                                    <div class="demo-component-wrapper">
                                        <iframe :src="demoUrl"></iframe>
                                    </div>
                                </div>
                            </div>
                            <div class="demo-code">
                                <hlcode :text="demoCode" :lang="'html'"></hlcode>
                            </div>
                        </div>
                        
                        <div v-if="body.currentIndex == 1">
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
                    </template>
                </tab>
            </div>
        </div>
        `
};

const componentItem = addMenuListItem('Component', '/component');
Object.keys(componentInfos).forEach(function (name) {
    componentItem.addChild(name, '/component/' + name);
});
