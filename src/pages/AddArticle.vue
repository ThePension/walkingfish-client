<template>
    <q-page class="flex flex-center">
      <div class="q-pa-md q-gutter-sm">
        <div class="text-h6 col">Ajouter un article</div>
        <div class="col">

          <!-- NOT FINISHED -->

          <!-- ARTICLE FORM -->
          <q-form
            @submit="addArticle"
            class="q-gutter-md">

            <q-input
              filled
              v-model="article.name"
              label="Nom"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'La couleur doit avoir un nom !']"
            />

            <q-input
              filled
              autogrow
              v-model="article.description"
              label="Description"
              lazy-rules
              :rules="[ val => val.length > 0 || 'Doit avoir une description !']"
            />

            <q-input
              filled
              prefix="CHF"
              v-model="article.price"
              mask='##.##'
              label="Prix"
              lazy-rules
              :rules="[
                val => (val !== null && val !== '' && parseInt(val)!=NaN)|| 'Ce champ doit contenir un nombre',
                val => val > 0  || 'Le prix ne doit pas être à 0'
                ]"
            />

            <q-input
              filled
              v-model="article.type"
              label="Type"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Doit avoir un type !']"
            />

            <q-option-group
                name="article_sizes"
                v-model="article.sizes"
                :options="sizes_options"
                type="checkbox"
                color="primary"
                inline
                />

            <q-option-group
                name="article_coloris"
                v-model="article.coloris"
                :options="coloris_options"
                type="checkbox"
                color="primary"
                inline
                />

            <div>
              <q-btn label="Submit" type="submit" color="primary"/>
            </div>

          </q-form>
          <!-- END ARTICLE FORM -->

      </div>
        <div class="text-h6 col">Couleurs disponibles</div>
        <div class="col">
            <q-chip v-for="colori in coloris"
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
      article: {
        name: null,
        description: null,
        price: null,
        type: null,
        sizes: [],
        coloris: [],
      },

      sizes_options: [
        { label: "XS", value: "XS" },
        { label: "S", value: "S" },
        { label: "M", value: "M" },
        { label: "L", value: "L" },
        { label: "XL", value: "XL" },
        { label: "XXL", value: "XXL" },
        { label: "Taille unique", value: "Taille unique" },
      ],

      coloris_options: [],
    };
  },
  methods: {
    getColoris() {
      // Get coloris from WK_API_URL
      axios
        .get(process.env.WK_API_URL + "/colori")
        .then((response) => {
          console.log(response.data);     // Debug
          this.coloris_options = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addArticle() {
      // Add new article to WK_API_URL
      axios
        .post(process.env.WK_API_URL + "/article")
        .then((response) => {
          console.log(response.data);     // Debug
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    // this.getColoris();
  },
});
</script>