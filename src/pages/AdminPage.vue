<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md q-gutter-sm">
      <q-btn
        outline
        style="color: green"
        label="Gestion des coloris"
        to="admin/color-management"
      />

      <q-btn
        outline
        style="color: black"
        label="Ajouter un article"
        to="/admin/add-article"
      />

      <q-btn
        outline
        style="color: blue"
        label="Gestion des articles"
        to="/admin/article-management"
      />

      <!-- TODO Modify the action for a real disconnection -->
      <q-btn 
        outline 
        style="color: red" 
        label="Se déconnecter" 
        @click="disconnect"/>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "AdminPage",
  data() {
    return {};
  },
  methods: {

    disconnect() {
      localStorage.removeItem('jwt');

      this.$router.push({ name: "home" });
    }
  },
});
</script>
