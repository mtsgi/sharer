<script setup lang="ts">
declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

import { ref } from "vue";

const serviceWorkerMessage = ref<string>("");
const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sharer/sw.js");
      if (registration.installing) {
        serviceWorkerMessage.value = ("Service worker installing");
      } else if (registration.waiting) {
        serviceWorkerMessage.value = ("Service worker installed");
      } else if (registration.active) {
        serviceWorkerMessage.value = ("Service worker active");
      }
    } catch (error) {
      serviceWorkerMessage.value = (`Registration failed with ${error}`);
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
    installPromptMessage.value = ("インストール可能ではありません。");
    return;
  }
  showButton.value = false;
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        installPromptMessage.value = ("ユーザーが A2HS プロンプトを受け入れました。");
      } else {
        installPromptMessage.value = ("ユーザーは A2HS のプロンプトを拒否しました。");
      }
      deferredPrompt = null;
    });
  };
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
      <v-img
        src="/ios/256.png"
        aspect-ratio="1"
        height="128"
      />
    </v-main>
  </v-layout>
</template>

<style scoped></style>
