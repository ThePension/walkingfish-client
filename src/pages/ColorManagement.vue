<template>
    <q-page class="flex flex-center">
      <div class="q-pa-md q-gutter-sm">
        <div class="text-h6 col">Ajouter une couleur</div>
        <div class="col">

          <!-- COLOR FORM -->
          <q-form
            @submit="addColori"
            class="q-gutter-md">

            <q-input
              filled
              v-model="colori.name"
              label="Nom"
              hint="Nom de la couleur"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'La couleur doit avoir un nom !']"
            />

            <q-input
              filled
              v-model="colori.hexa"
              label="Valeur hexadécimale"
              lazy-rules
              :rules="[
                val => val.length == 6 || 'La couleur doit être au format hexadécimale sans le `#`'
              ]"
            />

            <div>
              <q-btn label="Submit" type="submit" color="primary"/>
            </div>
          </q-form>
          <!-- END COLOR FORM -->

        </div>
        <div class="text-h6 col">Couleurs disponibles</div>
        <div class="col">
            <q-chip
            v-for="colori in coloris"
            :key="colori.id"
            :style="{ 'background-color': colori.hexa }"
            text-color="black">
            {{ colori.name }}
            </q-chip>
        </div>
      </div>

    </q-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "ColorManagement",

  data() {
    return {
      colori: {
        name: null,
        hexa: null,
      },
      coloris: [],
    };
  },
  methods: {
    getColoris() {
      // Get coloris from WK_API_URL
      axios
        .get(process.env.WK_API_URL + "/colori")
        .then((response) => {
          console.log(response.data);     // Debug
          this.coloris = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addColori() {
      // Get coloris from WK_API_URL
      axios
        .post(process.env.WK_API_URL + "/colori")
        .then((response) => {
          console.log(response.data);     // Debug
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getColoris();
  },
});
</script>