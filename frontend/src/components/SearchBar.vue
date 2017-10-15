<template>
  <div class="field">
    <p class="control has-icons-left has-icons-right">
      <input v-stream:input="input" class="input" type="text" placeholder="Search" :value="query">
      <span class="icon is-small is-left">
        <i class="fa fa-search"></i>
      </span>
    </p>
  </div>
</template>

<script>
import { search } from '../api'
import * as Rx from 'rxjs/Rx'

export default {
  created: function() {
    search(this.query)
    this.input
      .map(it => it.event.target.value)
      .debounceTime(300)
      .distinctUntilChanged()
      .do(this.save)
      .subscribe(search)
  },
  data: function() {
    return {
      query: localStorage.search || '',
      input: new Rx.Subject()
    }
  },
  methods: {
    save: function(query) {
      localStorage.search = query
    }
  }
}
</script>

<style>

</style>
