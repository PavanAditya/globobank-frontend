<template>
  <v-app id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import 'vuetify/dist/vuetify.min.css';
@import 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.mdi {
  font-family: 'Material Design Icons', 'materialdesignicons-webfont';
}
</style>
