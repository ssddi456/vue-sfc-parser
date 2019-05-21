import { addMenuItem } from "./menu";

export default {
    template: /* template */ `
        <div>
            <h1> welcome </h1>
            <p>设计目标</p>
            <ul>
                <li>丰富的预置组件</li>
                <li>直观的组件示例</li>
                <li>自动加载依赖</li>
                <li>自动生成文档</li>
                <li>支持单个页面</li>
                <li>组件依赖自动分析</li>
            </ul>
        </div>
        `
};

addMenuItem('Welcome', '/welcome');
