<template>
  <div>
    <NavBar />
    <v-layout class="d-flex flex-column justify-center pt-10 pb-10 pl-10 pr-10">
      <RouterView />
    </v-layout>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',

  components: {
    NavBar
  },

  created() {
    this.$store.dispatch("initResponsiblePersonsData"),
    this.$store.dispatch("initAccessRequestedSystemsData"),
    this.$store.dispatch("initAllRequestsData")
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Karla&display=swap');
@import url('https://fonts.googleapis.com/css?family=Material+Icons');

#app {
  font-family: 'Karla', sans-serif !important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

a:active,
a:link,
a:visited {
  text-decoration: none;
}

a:hover {
  background-color: #E0F7FA;
}
</style>
