<script setup lang="ts">
import Home from "./components/Home.vue";
import Share from "./components/Share.vue";

const searchParams = new URLSearchParams(location.search);
const title = searchParams.get("title");
const text = searchParams.get("text");
const url = searchParams.get("urkl");
</script>

<template>
  <v-app>
    <Home v-if="!title && !text && !url" />
    <Share v-else />
  </v-app>
</template>

<style scoped></style>
