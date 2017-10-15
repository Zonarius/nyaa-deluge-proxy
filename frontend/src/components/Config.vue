<template>
  <div>
    <a class="button" :class="{'is-loading': state === 'loading', 'is-success': state === 'success'}" @click="reload">
      <span v-show="state === 'success'" class="icon is-small">
        <i class="fa fa-check"></i>
      </span>
      <span>Reload</span>
    </a>
  </div>
</template>

<script>
import { reloadConfig } from '../api'

export default {
  data() {
    return {
      state: 'initial'
    }
  },
  methods: {
    async reload() {
      this.state = 'loading'
      try {
        await reloadConfig()
        this.state = 'success'
      } catch (err) {
        this.state = 'error'
        console.error(err)
      }
    }
  }
}
</script>

<style>
.code {
  font-family: monospace;
}
</style>
