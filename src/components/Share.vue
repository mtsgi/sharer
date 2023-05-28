<script setup lang="ts">
const searchParams = new URLSearchParams(location.search);
const title = searchParams.get("title");
const text = searchParams.get("text");
const url = searchParams.get("url");

const asList = ["text", "title", "url"];
const infoMap = new Map<string, string | null>([
  ["Title", title],
  ["Text", text],
  ["URL", url],
  ["Search Params", searchParams.toString()]
]);

const share = (as: string) => {
  const result = [title, text, url].join(" ");
  navigator.share({ [as]: result });
};
</script>

<template>
  <v-card
    variant="flat"
    class="px-4"
  >
    <v-btn
      v-for="as in asList"
      :key="`share-as-${as}`"
      prepend-icon="mdi-share-variant"
      color="success"
      size="large"
      variant="tonal"
      block
      class="mt-4"
      @click="share(as)"
    >
      Share as "{{ as }}"
    </v-btn>
  </v-card>

  <v-card variant="flat">
    <v-list lines="three">
      <v-list-item
        v-for="[key, value] in infoMap"
        :key="`info-${key}`"
      >
        <v-list-item-title>
          {{ key }}
        </v-list-item-title>
        <v-list-item-subtitle class="mt-2">
          {{ value || '---' }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <v-img
      src="/ios/256.png"
      aspect-ratio="1"
      height="128"
    />
  </v-card>
</template>

<style scoped></style>
