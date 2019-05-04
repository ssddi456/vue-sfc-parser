const hljs = require('highlight.js/lib/highlight');

// preload languages
const languages = [
    'javascript',
    'typescript',
    'less',
    'css',
    'xml'
];

const languagesMap = {
    languages: languages,
    aliases: {}
};

languages.forEach(function (lang) {
    languagesMap.aliases[lang] = lang;

    const langModule = require('highlight.js/lib/languages/' + lang)
    const def = langModule(hljs);
    hljs.registerLanguage(lang, langModule);

    const aliases = def.aliases;
    if (aliases) {
        aliases.forEach(function (alias) {
            languagesMap.aliases[alias] = lang;
        });
    }
});

hljs.configure({ classPrefix: 'hljs-' });


module.exports = function tryHighlight(str, lang) {
    try {
        const matching = str.match(/(\r?\n)/);
        const separator = matching ? matching[1] : '';
        const lines = matching ? str.split(separator) : [str];
        let result = hljs.highlight(lang, lines.shift());
        let html = result.value;
        while (lines.length > 0) {
            result = hljs.highlight(lang, lines.shift(), false, result.top);
            html += separator + result.value;
        }
        result.value = html;
        return result;
    } catch (err) {
        console.log(err);
        
    }
}