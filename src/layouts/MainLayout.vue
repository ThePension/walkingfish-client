<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>

        <q-img src="../statics/walkingfish-logo-white.png"
          class="logo-img q-mx-md q-my-md"/>

        <q-btn 
          flat 
          label="Walking Fish"
          size="22px"
          to="/home">
        </q-btn>

        <q-btn 
          flat 
          label="Catalogue"
          to="/catalog">
        </q-btn>

        <q-btn 
          flat 
          label="Contact"
          to="/about">
        </q-btn>

      </q-toolbar>      
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {
  },

  setup() {

  },
});
</script>

<style lang="scss">

  .logo-img {
    width: 5%;

  }
</style>