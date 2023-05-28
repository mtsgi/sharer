<script setup lang="ts">
import { ref } from "vue";

type ParamType = "title" | "text" | "url";

const searchParams = new URLSearchParams(location.search);
const paramsMap = new Map<ParamType, string | null>([
  ["title", searchParams.get("title")],
  ["text", searchParams.get("text")],
  ["url", searchParams.get("url")]
]);

const asList: ParamType[] = ["text", "title", "url"];
const infoMap = new Map<string, string|null|undefined>([
  ["Search Params", searchParams.toString()]
]);

/** ユーザーが作成するパラメーターの並び順配列 */
const paramsArray = ref<ParamType[]>(["title", "text", "url"]);

const onClose = (index: number) => {
  paramsArray.value.splice(index, 1);
};

const onAdd = (param: ParamType) => {
  paramsArray.value.push(param);
};

const share = (as: ParamType) => {
  const result = paramsArray.value.map(
    (param) => paramsMap.get(param)
  ).join(" ");
  navigator.share({ [as]: result });
};
</script>

<template>
  <v-card
    variant="flat"
    class="px-4"
  >
    <v-card
      v-if="paramsArray.length > 0"
      class="pa-4 mt-4"
      color="info"
      variant="tonal"
    >
      <v-chip
        v-for="(param, index) in paramsArray"
        :key="`param-${index}-${Math.random()}`"
        size="large"
        class="mr-2"
        closable
        @click:close="onClose(index)"
      >
        {{ param }}
      </v-chip>
    </v-card>

    <v-alert
      v-else
      type="warning"
      variant="tonal"
      class="mt-4"
    >
      共有したい内容を選択してください
    </v-alert>

    <v-btn
      v-for="as in asList"
      :key="`share-as-${as}`"
      prepend-icon="mdi-share-variant"
      color="success"
      size="large"
      variant="tonal"
      block
      class="mt-4"
      :disabled="paramsArray.length === 0"
      @click="share(as)"
    >
      Share as "{{ as }}"
    </v-btn>
  </v-card>

  <v-card variant="flat">
    <v-list lines="three">
      <v-list-item
        v-for="[key, value] in paramsMap"
        :key="`info-${key}`"
        rounded="none"
        link
        @click="onAdd(key)"
      >
        <v-list-item-title>
          {{ key }}
        </v-list-item-title>
        <v-list-item-subtitle class="mt-2">
          {{ value || '---' }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>

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
      src="./ios/256.png"
      aspect-ratio="1"
      height="128"
    />
  </v-card>
</template>

<style scoped></style>
