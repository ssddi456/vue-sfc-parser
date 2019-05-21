export default {
    props: {
        titles: {
            type: Array,
            required: true,
        },
    },
    data() {
        return { currentIndex: 0 };
    },
    template: /* template */ `
    <div class="tab">
        <div class="head">
            <ul>
            <li v-for="(item, index) in titles"
            :class="{active: index == currentIndex }"
                    @click="currentIndex = index">
                    <span>
                        <slot name="title" 
                        :index="index" 
                        :text="item"
                        :currentIndex="currentIndex"
                        >
                        </slot>
                    </span>
                </li>
            </ul>
        </div>
        <div class="body">
            <slot name="body"                     
                :currentIndex="currentIndex"
            >
            </slot>
        </div>
    </div>
    `
}
