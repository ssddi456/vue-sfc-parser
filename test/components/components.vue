<template lang="jade">
    .test
        slot
            | default
</template>

<script>
export default {
  data() {
    return {};
  },

  props: {
    /**
     * a simple id
     */
    id: {
      type: String,
      required: true
    }
  },

  methods: {
    /**
     *
     */
    test() {
      /**
       * a simple event
       */
      this.$emit("simple_event", "test");
    }
  }
};
</script>

<style scoped>
    .test {
        color: red;
    }
</style>

