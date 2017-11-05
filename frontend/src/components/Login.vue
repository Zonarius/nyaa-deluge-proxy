<template>
  <div>
    <div id="loginButton"></div>
    <div class="error">
      {{errorMessage}}
    </div>
  </div>
</template>

<script>
import { login, loggedIn } from '../api'

export default {
  data() {
    return {
      errorMessage: ''
    }
  },
  subscriptions() {
    return {
      googleApi: login
        .filter(it => !it.loggedIn && it.google.loaded)
        .take(1)
        .do(this.loadButton)
    }
  },
  methods: {
    loadButton() {
      window.gapi.signin2.render('loginButton', {
        onsuccess: loggedIn,
        onfailure: err => { this.errorMessage = err.toString() }
      })
    }
  }
}
</script>

<style>
  .error {
    color: red;
  }

  .g-signin-button {
    display: inline-block;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #3c82f7;
    color: #fff;
    box-shadow: 0 3px 0 #0f69ff;
  }
</style>
