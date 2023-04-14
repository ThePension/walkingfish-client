<template>
    <q-card class="my-card">
      <q-img :src="image"
        style="width: 200px; height: 200px;"/>

      <q-card-section>
        <div class="text-h6">{{ article.name }}</div>
        <div class="text-subtitle2">{{ article.description }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ lorem }}
      </q-card-section>
    </q-card>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";

// Props
export default defineComponent({
  name: "ArticleCard",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      input: this.article.name,
      image: [],
    };
  },
  methods: {
    generate() {
      axios
        .get(process.env.PEXELS_API_URL, {
          headers: {
            Authorization: process.env.PEXELS_API_TOKEN,
          },
          params: {
            query: this.input,
          },
        })
        .then((response) => {
          // Set the image data
          console.log(response.data.photos);
          this.image = response.data.photos[0].src.original;
        })
        .catch((error) => {
          console.log(error);
        });

      // this.image = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${this.input}`;
    },
  },
  mounted() {
    this.generate()
  },
});
</script>
