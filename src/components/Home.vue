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
    installPromptMessage.value = ("deferredPrompt がありません。");
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
  <h1>Sharer</h1>
  <p v-show="showButton">
    <button @click="install">
      Install
    </button>
  </p>
  <p>{{ serviceWorkerMessage }}</p>
  <p>{{ installPromptMessage }}</p>
</template>

<style scoped></style>
