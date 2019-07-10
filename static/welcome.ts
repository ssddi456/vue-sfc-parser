import { addMenuItem } from "./menu";
import * as welcome from '../common/welcome.md';

export default {
    template: /* template */ `<div>${welcome}</div>`};

addMenuItem('Welcome', '/welcome');
