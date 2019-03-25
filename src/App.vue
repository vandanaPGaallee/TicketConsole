<template>
  <div id="app">
    <div id="navbar" v-if="!authenticated">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand> <img src="./assets/logo.png" style="width:45px;padding-left:5px"> </b-navbar-brand>
      </b-navbar>
    </div>
    <div id="navbar" v-if="authenticated">
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand> <img src="./assets/logo.png" style="width:45px;padding-left:5px"> </b-navbar-brand>

        <b-navbar-toggle target="nav_collapse" />

        <b-collapse is-nav id="nav_collapse">
          <b-navbar-nav>
            <!-- <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link> -->
            <b-nav-item v-if="authenticated" to="/dashboard">Dashboard</b-nav-item>
            <b-nav-item v-if="authenticated" to="/table">Tickets</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using button-content slot -->
              <template slot="button-content"><em>User</em></template>
              <b-dropdown-item v-if="authenticated" to="/login" v-on:click.native="logout()">Signout</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <router-view @authenticated="setAuthenticated" />
  </div>
</template>

<script>
/* eslint-disable */ 
export default {
  name: 'App',
        data() {
            return {
                authenticated: false,
                error: false
            }
        },
        mounted() {
            if(!this.authenticated) {
                // this.$router.replace({ name: 'login' })
            }
        },
        methods: {
            setAuthenticated(status) {
                this.authenticated = status;
            },
            setError(status) {
              this.error = status;
            },
            logout() {
                this.authenticated = false;
            }
        }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
