<template lang="pug">
    test(:id="'useless'")
        slot(name="default")
            | test demo
</template>
<script>
import test from './components';

export default {
    components: {
        test: test
    }
}
</script>
