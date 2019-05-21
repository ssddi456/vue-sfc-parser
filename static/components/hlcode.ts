export default {
    props: {
        text: {
            type: String
        },
        lang: {
            type: String
        }
    },
    template: /* template */`
    <pre style="margin:0"><code v-html="text" class="hljs" :class="lang"></code></pre>
`
}
