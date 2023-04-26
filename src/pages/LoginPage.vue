<script setup>
import { defineProps, ref } from "vue";
import axios from "axios";
import { useAuthStore } from "src/stores/auth";

const username = ref("");
const password = ref("");
const errors = ref([]);

const authStore = useAuthStore();

const login = async () => {
  try {
    const User = new FormData();
    User.append("username", username.value);
    User.append("password", password.value);

    const response = await axios.post(
      process.env.WK_API_URL + "/auth/login",
      User
    );

    console.log(response.data);

    if (response.data.error) {
      errors.value = [response.data.error];
      return;
    }

    authStore.login();

    this.$q.notify({
      message: "Login successful",
      color: "positive",
    });

    this.$router.push({ name: "home" });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <q-page class="row q-mx-xl">
    <div class="col-12 col-md-6 col-lg-4">
      <h1>Login</h1>
      <ErrorBanner :errors="errors" />
      <form @submit.prevent="login">
        <q-input
          v-model="username"
          label="Username"
          type="text"
          :rules="[(val) => !!val || 'Username is required']"
        />
        <q-input
          v-model="password"
          label="Password"
          type="password"
          :rules="[(val) => !!val || 'Password is required']"
        />
        <q-btn
          type="submit"
          color="primary"
          label="Login"
          no-caps
          class="full-width q-my-md"
        />
      </form>
    </div>
  </q-page>
</template>
