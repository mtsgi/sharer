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
  <v-card
    variant="flat"
    class="pa-4"
  >
    <v-btn
      prepend-icon="mdi-share-variant"
      variant="outlined"
      size="large"
      block
      @click="share"
    >
      Share as "text"
    </v-btn>

    <v-list lines="three">
      <v-list-item>
        <v-list-item-title>Title</v-list-item-title>
        <v-list-item-subtitle>
          {{ title || '---' }}
        </v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-title>Text</v-list-item-title>
        <v-list-item-subtitle>
          {{ text || '---' }}
        </v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-title>URL</v-list-item-title>
        <v-list-item-subtitle>
          {{ url || '---' }}
        </v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-title>Search Params</v-list-item-title>
        <v-list-item-subtitle>
          {{ searchParams || '---' }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<style scoped></style>
