<template>
  <q-layout view="hHh LpR fff">
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

        <q-btn-dropdown label="Contact" flat>
          <q-list>
            <q-item clickable v-close-popup>
              <a href="https://instagram.com/walkingxfish">
              </a>
              <q-item-section avatar>
                <q-avatar>
                  <img src="../statics/Instagram_icon.png"/>
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>Instagram</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

      </q-toolbar>      
    </q-header>

    <q-footer flat>
      <q-toolbar>
        <q-toolbar-title class="text-center">© 2023 Copyright: WalkingFish.ch</q-toolbar-title>
      </q-toolbar>
    </q-footer>

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