<template>
    <q-card class="my-card"
      style="width: 300px;">
      <q-img :src="image"
        style="width: 300px; height: 300px;"/>

      <q-card-section>
        <div class="text-h5">{{ article.name }}</div>
        <div class="text-subtitle2">{{ article.description }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none row">
        <div class="text-h6 col">Tailles disponibles</div>
        <div class="col">
          <q-chip v-for="size in article.sizes" :key="size" 
            color="primary" 
            text-color="white">
            {{ size }}
          </q-chip>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none row">
        <div class="text-h6 col">Couleurs</div>
        <div class="col">
          <q-chip v-for="colori in article.coloris" :key="colori.id" 
            :style="{ 'background-color': colori.hexa }"
            text-color="white">
            {{ colori.name }}
          </q-chip>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none row">
        <div class="text-h6 col">Type</div>
        <div class="col text-h6 text-right q-mx-lg">{{ article.type }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none row">
        <div class="text-h6 col">Prix</div>
        <div class="col text-h6 text-right q-mx-lg">{{ article.price }} CHF</div>
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
