<script setup lang="ts">
import Home from "./components/Home.vue";
import Share from "./components/Share.vue";

const searchParams = new URLSearchParams(location.search);
const title = searchParams.get("title");
const text = searchParams.get("text");
const url = searchParams.get("urkl");
</script>

<template>
  <main>
    {{ searchParams }}

    <Home v-if="!title && !text && !url" />

    <Share v-else />
  </main>
</template>

<style scoped></style>
