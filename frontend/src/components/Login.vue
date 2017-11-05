<template>
  <div>
    <g-signin-button
      :params="googleSignInParams"
      @success="onSignInSuccess"
      @error="onSignInError">
      Sign in with Google
    </g-signin-button>
    <div class="error" v-show="errorMessage">
      {{errorMessage}}
    </div>
  </div>
</template>

<script>
import { loggedIn } from '../api'

export default {
  data() {
    return {
      googleSignInParams: {
        client_id: '1094098933377-h2er2a2nkep72q9g1jqto7n9qi20t18o.apps.googleusercontent.com'
      },
      errorMessage: ''
    }
  },
  methods: {
    onSignInSuccess(user) {
      loggedIn(user)
    },
    onSignInError(error) {
      this.errorMessage = error.toString()
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
