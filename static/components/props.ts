export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        info: {
            type: Array,
            required: true,
        }
    },
    template: `
    <div v-if="Object.keys(info).length > 0">
        <h2>{{title}}</h2>
        <div v-for="(item) in info">
            <b>{{item.name}}</b>
            <p>{{item.description}}</p>
        </div>
    </div>
    `,
};
