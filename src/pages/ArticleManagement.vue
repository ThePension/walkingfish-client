<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md q-gutter-sm">
      <div class="text-h6 col">Modifier un article</div>
      <div class="col">

        <!-- ARTICLE FORM -->
        <q-form
          @submit="updateArticle"
          class="q-gutter-md"
          style="min-width: 500px">

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
            type="number"
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

          <!-- TODO delete that thing -->

          <!-- <q-option-group
              name="article_sizes"
              v-model="article.sizes"
              :options="sizes_options"
              type="checkbox"
              color="primary"
              inline
          /> -->

          <q-select
            filled
            v-model="article.sizes"
            multiple
            :options="sizes_options"
            label="Tailles"
          />

          <q-select
            filled
            v-model="article.coloris"
            multiple
            :options="coloris_options"
            :option-label="'hexa'"
            label="Coloris"
          />

          <!-- Visually better but creates more problems -->

          <!-- <q-select
            filled
            v-model="article.coloris"
            multiple
            :options="coloris_options"
            label="Coloris"
            style="width: 250px">

            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label :style="{ 'background-color': scope.opt.hexa }">{{ scope.opt.hexa }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select> -->

          <div>
            <q-btn label="Submit" type="submit" color="primary"/>
          </div>

        </q-form>
        <!-- END ARTICLE FORM -->
      </div>
    </div>

  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
name: "UpdateArticle",

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
  getArticle() {
    // Get coloris from WK_API_URL
    axios
      .get(process.env.WK_API_URL + "/article")
      .then((response) => {
        console.log(response.data);     // Debug
        this.coloris_options = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  updateArticle() {
    // Add new article to WK_API_URL

    // Include the JWT in the Authorization header for future requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;

    const Article = {
      name: this.article.name,
      description: this.article.description,
      price: this.article.price,
      type: this.article.type,
      sizes: this.article.sizes.map((size) => size.value),
      coloris: this.article.coloris
    };

    // Article.append("sizes", JSON.stringify(this.article.sizes.values));

    console.log(Article);

    axios
      .put(process.env.WK_API_URL + "/article", Article,
      {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);     // Debug
      })
      .catch((error) => {
        console.log(error);
      });
  },
},
created() {
  this.getArticle();
},
});
</script>