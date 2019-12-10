<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <h2>Globo Bank Login</h2>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <v-text-field label="E-mail" v-model="email" v-bind:rules="emailRules" required></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <v-text-field
          label="Password"
          v-model="password"
          v-bind:rules="passwordRules"
          v-bind:type="'password'"
          required
        ></v-text-field>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <v-btn v-on:click="cancel">Cancel</v-btn>
        <v-btn color="primary" v-on:click="login">Login</v-btn>
      </v-flex>
    </v-layout>
    <v-snackbar :timeout="5000" :top="true" v-model="showAlert">{{ loginError }}</v-snackbar>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      showAlert: false,
      message: '',
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail must be valid'
      ],
      password: '',
      passwordRules: [v => !!v || 'Password is Required']
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    },
    loginError () {
      return this.$store.getters.loginError
    }
  },
  methods: {
    login: function () {
      const vm = this
      const payload = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('loginUser', payload).then(() => {
        console.log(vm.isLoggedIn, payload)
        if (vm.isLoggedIn) {
          this.$router.push({ path: '/' })
        } else {
          vm.showAlert = true
        }
      })
    },
    cancel: function () {
      const vm = this
      vm.password = ''
      vm.email = ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
