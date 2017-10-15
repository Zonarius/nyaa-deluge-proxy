<template>
  <div>
    <div class="tabs">
      <ul>
        <li :class="{'is-active': isActive(index)}" v-for="(tab, index) in tabPanes" :key="index">
          <a @click="activate(index)">{{tab.label}}</a>
        </li>
      </ul>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  mounted() {
    this.activate(this.activeIndex)
  },
  data() {
    return {
      tabPanes: [],
      activeIndex: 0
    }
  },
  methods: {
    isActive(index) {
      return this.activeIndex === index
    },
    activate(index) {
      this.activeIndex = index
      this.tabPanes.forEach((tab, index) => {
        tab.show = this.activeIndex === index
      })
    }
  }
}
</script>

<style>

</style>
