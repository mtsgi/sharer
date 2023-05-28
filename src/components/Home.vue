<script setup lang="ts">
import { ref } from "vue";
import Howto from "./Howto.vue";

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

const serviceWorkerMessage = ref<string>("");
const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sharer/sw.js");
      if (registration.installing) {
        serviceWorkerMessage.value = ("Service workerはインストール中です");
      } else if (registration.waiting) {
        serviceWorkerMessage.value = ("Service workerがインストールされました");
      } else if (registration.active) {
        serviceWorkerMessage.value = ("Service workerは有効です");
      }
    } catch (error) {
      serviceWorkerMessage.value = (`Service workerの登録に失敗しました: ${error}`);
    }
  }
};

registerServiceWorker();

const installPromptMessage = ref<string>("");
let deferredPrompt: BeforeInstallPromptEvent | null = null;
const showButton = ref<boolean>(false);

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showButton.value = true;
});

const install = () => {
  if (!deferredPrompt) {
    installPromptMessage.value = ("PWAをインストールすることができません");
    return;
  }
  showButton.value = false;
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === "accepted") {
      installPromptMessage.value = ("インストールが承認されました");
    } else {
      installPromptMessage.value = ("インストールが拒否されました");
    }
    deferredPrompt = null;
  });
};

const hasInstalled = window.matchMedia("(display-mode: standalone)").matches;
</script>

<template>
  <v-layout>
    <v-app-bar rounded="none">
      <template #prepend>
        <v-app-bar-nav-icon>
          <v-icon>mdi-share-variant</v-icon>
        </v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>Sharer</v-app-bar-title>
      <template #append>
        <v-btn
          href="https://github.com/mtsgi/sharer"
          target="_blank"
          icon="mdi-github"
        />
      </template>
    </v-app-bar>

    <v-main>
      <p
        v-show="showButton"
        class="mt-4 mx-4"
      >
        <v-btn
          prepend-icon="mdi-cellphone-arrow-down-variant"
          variant="outlined"
          size="large"
          block
          @click="install"
        >
          Install
        </v-btn>
      </p>
      <v-alert
        v-show="serviceWorkerMessage"
        type="info"
        variant="tonal"
        class="mt-4 mx-4"
      >
        {{ serviceWorkerMessage }}
      </v-alert>
      <v-alert
        v-show="installPromptMessage"
        type="info"
        variant="tonal"
        class="mt-4 mx-4"
      >
        {{ installPromptMessage }}
      </v-alert>
      <v-alert
        v-show="hasInstalled"
        type="success"
        variant="tonal"
        class="mt-4 mx-4"
      >
        SharerはPWAとしてインストール済みです
      </v-alert>

      <Howto />

      <v-img
        src="./ios/256.png"
        aspect-ratio="1"
        height="128"
      />
    </v-main>
  </v-layout>
</template>

<style scoped></style>
