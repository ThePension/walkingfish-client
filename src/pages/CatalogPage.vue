<template>
  <!-- Simple vue using ArticleCard for display all articles -->

  <div class="container mt-4 q-px-xl">

    <div class="subtitle_homepage">
      <h2>Liste des articles</h2>
    </div>

    <q-page class="flex">
      <div v-for="article in articles" :key="article.id"
        class="q-pa-md row q-gutter-md items-start">
          <ArticleCard :article="article" />
      </div>
    </q-page>

  </div>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";
import ArticleCard from "../components/ArticleCard.vue";

export default defineComponent({
  name: "CatalogPage",

  components: {
    ArticleCard,
  },

  data() {
    return {
      articles: [],
    };
  },
  methods: {
    getArticles() {
      // Get article from WK_API_URL
      axios
        .get(process.env.WK_API_URL + "/article")
        .then((response) => {
          // Set the image data
          console.log(response.data);
          this.articles = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getArticles();
  },
});
</script>
