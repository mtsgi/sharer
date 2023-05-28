<script setup lang="ts">
const searchParams = new URLSearchParams(location.search);
const title = searchParams.get("title");
const text = searchParams.get("text");
const url = searchParams.get("url");

const share = () => {
  const result = [title, text, url].join(" ");
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
    <div>{{ title || '---' }}</div>
    <strong>Text</strong>
    <div>{{ text || '---' }}</div>
    <strong>Url</strong>
    <div>{{ url || '---' }}</div>
    <strong>searchParams</strong>
    <div>{{ searchParams }}</div>
  </div>
</template>

<style scoped></style>
