<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "src/stores/auth";

const authStore = useAuthStore();

onMounted(() => {
  console.log(authStore.isLoggedIn);
});
</script>

<template>
  <q-layout view="hHh LpR fff">
    <q-header>
      <q-toolbar>
        <q-img
          src="../statics/walkingfish-logo-white.png"
          class="logo-img q-mx-md q-my-md"
        />

        <q-btn flat label="Walking Fish" size="22px" to="/home"> </q-btn>

        <q-btn flat label="Catalogue" to="/catalog"> </q-btn>

        <q-btn-dropdown label="Contact" flat>
          <q-list>
            <q-item clickable v-close-popup>
              <a href="https://instagram.com/walkingxfish"> </a>
              <q-item-section avatar>
                <q-avatar>
                  <img src="../statics/Instagram_icon.png" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>Instagram</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <!-- Admin button is the user is logged in -->
        <q-btn
          v-if="authStore.isLoggedIn"
          label="Dashboard"
          color="purple"
          to="/admin"
          class="q-mr-md"
        />
      </q-toolbar>
    </q-header>

    <q-footer flat>
      <q-toolbar>
        <q-toolbar-title class="text-center"
          >© 2023 Copyright: WalkingFish.ch</q-toolbar-title
        >
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
.logo-img {
  width: 5%;
}
</style>
