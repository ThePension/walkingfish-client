<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md q-gutter-sm">
      <q-btn
        outline
        style="color: green"
        label="Gestion des coloris"
        to="/colorManagement"
      />

      <q-btn
        outline
        style="color: black"
        label="Ajouter un article"
        to="/addArticle"
      />

      <q-btn
        outline
        style="color: blue"
        label="Gestion des articles"
        to="/articleManagement"
      />

      <!-- TODO Modify the action for a real disconnection -->
      <q-btn outline style="color: red" label="Se déconnecter" to="/" />
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
  methods: {},
});
</script>
