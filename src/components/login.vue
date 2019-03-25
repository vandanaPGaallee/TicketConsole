<template>
  <div class="container" style="align:center; margin-top:150px">
    <b-form id = "login"  style="margin:0 auto;" align=center>
      <b-form-group>
        <b-form-input v-model="username" type="text" placeholder="Username" required/>
      </b-form-group>

      <b-form-group :invalid-feedback="invalidFeedback">
        <b-form-input v-model="password" type="password" placeholder="Password" required/>
      </b-form-group>

      <div class="text-center">
        <b-button id="login-button" type="submit" variant="primary" v-on:click="login()" block>Sign In</b-button>
        <p v-if="error" class="error">Bad login information</p>
      </div>
    </b-form>
  </div>
</template>

<script>
// import json from '../json/data.json'
import authdata from '../json/User.json'
export default {

  data () {
    return {
      username: '',
      password: '',
      error: false,
      invalidFeedback: '',
      logindata: authdata
    }
  },
  methods: {
    login () {
      var flag = 0
      this.logindata.forEach(x => {
        if (x.id === this.username) {
          if (x.password === this.password) {
            flag = 1
            this.$emit('authenticated', true)
            this.$router.replace('/dashboard')
          }
        }
      })
      if (flag === 0) {
        this.error = true
      }
    }
  }
}
</script>

<style>
#login-button{
  background-color: #17a2b8 !important;
  border:none;
}
</style>
