import VueRouter, { RouteConfig } from 'vue-router';

import welcome from './welcome';
import component from './component';
import page from './page';
import { routerChange } from './menu';

export const routes: RouteConfig[] = [
    {
        path: '/welcome', component: welcome,
    },
    {
        path: '/page', component: page
    },
    {
        path: '/component', component: component,
        children: [
            { path: ':componentId', name: 'component', component: component }
        ]
    },
    { path: '*', redirect: '/welcome' }
];

export const router = new VueRouter({
    routes
});

router.afterEach(routerChange);
