<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const coloris = ref([]);
const colori = ref({
  name: "",
  hexa: "",
});

const fetchColoris = () => {
  axios
    .get(process.env.WK_API_URL + "/colori")
    .then((response) => {
      coloris.value = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const addColori = () => {
  // Include the JWT in the Authorization header for future requests
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("jwt")}`;

  let Colori = new FormData();
  Colori.append("name", colori.value.name);
  Colori.append("hexa", colori.value.hexa);

  axios
    .post(process.env.WK_API_URL + "/colori", Colori, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      fetchColoris();
    })
    .catch((error) => {
      console.log(error);
    });
};

const deleteColori = (id) => {
  // Ask confirmation
  if (!confirm("Voulez-vous vraiment supprimer cette couleur ?")) {
    return;
  }

  // Include the JWT in the Authorization header for future requests
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("jwt")}`;

  axios
    .delete(process.env.WK_API_URL + "/colori/" + id)
    .then((response) => {
      fetchColoris();
    })
    .catch((error) => {
      console.log(error);
    });
};

onMounted(() => {
  fetchColoris();
});
</script>

<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md q-gutter-sm">
      <div class="text-h6 col">Ajouter une couleur</div>
      <div class="col">
        <!-- COLOR FORM -->
        <q-form @submit="addColori" class="q-gutter-md">
          <q-input
            filled
            v-model="colori.name"
            label="Nom"
            hint="Nom de la couleur"
            lazy-rules
            :rules="[
              (val) =>
                (val && val.length > 0) || 'La couleur doit avoir un nom !',
            ]"
          />

          <q-input
            filled
            v-model="colori.hexa"
            label="Valeur hexadécimale"
            lazy-rules
            :rules="[
              (val) =>
                val.length == 7 ||
                'La couleur doit être au format hexadécimale avec le `#`',
            ]"
          />

          <div>
            <q-btn label="Submit" type="submit" color="primary" />
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
          text-color="black"
        >
          {{ colori.name }}
          <!-- Cross button to delete the colori -->
          <q-icon
            name="close"
            class="cursor-pointer q-ml-sm"
            @click="deleteColori(colori.id)"
          />
        </q-chip>
      </div>
    </div>
  </q-page>
</template>
