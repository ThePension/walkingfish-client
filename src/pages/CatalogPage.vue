<template>
  <!-- Simple vue using ArticleCard for display all articles -->
  <q-page class="flex flex-center">
    <div v-for="article in articles" :key="article.id" flat bordered>
        <ArticleCard :article="article" />
    </div>
  </q-page>
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
