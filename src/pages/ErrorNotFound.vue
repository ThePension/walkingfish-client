<template>
  <div
    class="error-page fullscreen text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <div style="font-size: 20vh">404</div>

      <div class="text-h4" style="opacity: 0.4">Oops. Nothing here...</div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="grey"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ErrorNotFound",
});
</script>

<style>
.error-page {
  background-color: #d4a373;
}
</style>
