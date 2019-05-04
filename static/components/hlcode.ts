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
    <pre><code v-html="text" class="hljs" :class="lang"></code></pre>
`
}