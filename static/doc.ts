import Vue from 'vue';
import {  links } from './menu';
import { router } from './routes';

new Vue({
    router,
    el: '#main',
    data: {
        collapsed: false,
        sidebarCollapsed: false,
        links,
    },
    methods: {
        toggleMenu(collapsed = false) {
            this.collapsed = collapsed;
        },
        toggleSideMenu() {
            this.sidebarCollapsed = !this.sidebarCollapsed;
        }

    }
});
