<template>
  <form @submit.prevent="submit">
    <div class="field has-addons">
      <p class="control has-icons-left has-icons-right">
        <input class="input" type="text" placeholder="Search" v-model="query">
        <span class="icon is-small is-left">
          <i class="fa fa-search"></i>
        </span>
      </p>
      <div class="control">
        <button type="submit" class="button is-info">
          Search
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { search } from '../api'

export default {
  created: function() {
    console.log('created!')
    search(this.query)
  },
  data: function() {
    return {
      query: localStorage.search || ''
    }
  },
  methods: {
    save: function(query) {
      console.log('saving!')
      localStorage.search = query
    },
    submit: function() {
      console.log('submitting!', this.query)
      this.save(this.query)
      search(this.query)
    }
  }
}
</script>

<style>

</style>
