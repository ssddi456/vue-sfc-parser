import { parse, Loader } from "@vuedoc/parser";
import { readFileSync } from "fs";
import { render } from "pug";

const code = readFileSync('./test/components/test.vue', 'utf-8');

function PugLoader( options ){
    return {
        load(source: string) {
            const outputText = render(source);
            options.source.template = outputText;
            // don't forget the return here
            return Promise.resolve();
        }
    }
}    

parse({
    filecontent: code,
    loaders: [
        /**
         * Register TypeScriptLoader
         * Note that the name of the loader is either the extension
         * of the file or the value of the attribute `lang`
         */
        Loader.extend('pug', PugLoader),
    ]
}).then(function (component) {
    console.log(component);
})