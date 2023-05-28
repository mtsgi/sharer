<script setup lang="ts">
import { useRoute } from "vue-router";

const { query } = useRoute();

const share = () => {
  const result = [query["title"], query["text"], query["url"]].join(" ");
  navigator.share({ text: result });
};
</script>

<template>
  <p>
    <button @click="share">
      Share as "text"
    </button>
  </p>
  <div>
    <strong>Title</strong>
    <div>{{ query['title'] || '---' }}</div>
    <strong>Text</strong>
    <div>{{ query['text'] || '---' }}</div>
    <strong>Url</strong>
    <div>{{ query['url'] || '---' }}</div>
  </div>
</template>

<style scoped></style>
