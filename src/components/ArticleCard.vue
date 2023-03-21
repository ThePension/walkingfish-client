<template>
  {{ article }}
</template>

<script>
import { defineComponent } from "vue";

// Props
export default defineComponent({
  name: "ArticleCard",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
});
</script>
