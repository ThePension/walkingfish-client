<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";

const emits = defineEmits(["refresh"]);

const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
});

const image = ref("");
const isLoggedIn = ref(false);

const generate = () => {
  axios
    .get(process.env.PEXELS_API_URL, {
      headers: {
        Authorization: process.env.PEXELS_API_TOKEN,
      },
      params: {
        query: props.article.name,
      },
    })
    .then((response) => {
      // Set the image data
      image.value = response.data.photos[0].src.original;
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteArticle = (id) => {
  // Ask confirmation
  if (!confirm("Voulez-vous vraiment supprimer cet article ?")) {
    return;
  }

  // Include the JWT in the Authorization header for future requests
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("jwt")}`;

  axios
    .delete(process.env.WK_API_URL + "/article/" + id)
    .then((response) => {
      // Show a success message
      // const $q = useQuasar();
      // $q.notify({
      //   color: "positive",
      //   message: "Article supprimé avec succès",
      // });

      // Emit the refresh event
      emits("refresh");
    })
    .catch((error) => {
      console.log(error);
    });
};

onMounted(() => {
  isLoggedIn.value = localStorage.getItem("jwt") != null;

  generate();
});
</script>

<template>
  <q-card>
    <q-img :src="image" style="width: 100%; height: auto" />

    <q-card-section>
      <div class="text-h5">{{ props.article.name }}</div>
      <div class="text-subtitle2">{{ props.article.description }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none row">
      <div class="text-h6 col">Tailles disponibles</div>
      <div class="col">
        <q-chip
          v-for="size in props.article.sizes"
          :key="size"
          color="primary"
          text-color="white"
        >
          {{ size }}
        </q-chip>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none row">
      <div class="text-h6 col">Couleurs</div>
      <div class="col">
        <q-chip
          v-for="colori in props.article.coloris"
          :key="colori.id"
          :style="{ 'background-color': colori.hexa }"
          text-color="white"
        >
          {{ colori.name }}
        </q-chip>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none row">
      <div class="text-h6 col">Type</div>
      <div class="col text-h6 text-right q-mx-lg">{{ props.article.type }}</div>
    </q-card-section>

    <q-card-section class="q-pt-none row">
      <div class="text-h6 col">Prix</div>
      <div class="col text-h6 text-right q-mx-lg">
        {{ props.article.price }} CHF
      </div>
    </q-card-section>

    <!-- Change variable and check if user is logged in -->
    <q-card-section v-if="isLoggedIn">
      <router-link
        :to="{
          path: 'admin/edit-article/' + props.article.id,
          params: { id: props.article.id },
        }"
      >
        <q-btn color="primary" label="Editer" />
      </router-link>

      <!-- Delete button -->
      <q-btn
        color="negative"
        label="Supprimer"
        class="q-ml-sm"
        @click="deleteArticle(props.article.id)"
      />
    </q-card-section>
  </q-card>
</template>
