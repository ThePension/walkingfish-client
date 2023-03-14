<template>
  <q-page class="flex flex-center">
    <!-- String input -->
    <q-input v-model="input" label="String input" filled clearable />
    <!-- Generate button -->
    <q-btn label="Generate" color="primary" @click="generate" />
    <!-- Generated outputs (images) -->
    <q-img
      v-for="image in images"
      :key="image.id"
      :src="image.src.tiny"
      style="width: 200px; height: 200px"
    />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import axios from "axios";

export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      input: "",
      images: [],
    };
  },
  methods: {
    generate() {
      // GET request to the QR code API using axios
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
          this.images = response.data.photos;
        })
        .catch((error) => {
          console.log(error);
        });

      // this.image = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${this.input}`;
    },
  },
});
</script>
