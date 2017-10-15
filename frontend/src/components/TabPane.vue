<template>
  <div v-show="show">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['label'],
  data() {
    return {
      show: false
    }
  },
  created() {
    this.$parent.tabPanes.push(this)
  },
  beforeDestroy() {
    this.$parent.tabPanes.splice(this.index, 1)
  },
  computed: {
    index() {
      return this.$parent.tabPanes.indexOf(this)
    }
  }
}
</script>

<style>

</style>
