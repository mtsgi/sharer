<template>
  <v-list>
    <v-list-item>
      <template #prepend>
        <v-icon class="mr-4">
          mdi-help-circle
        </v-icon>
      </template>
      Sharerの使い方
    </v-list-item>
  </v-list>
  <v-timeline
    side="end"
    align="start"
    style="height: auto"
    density="compact"
    class="mx-4"
  >
    <v-timeline-item
      dot-color="#eeeeee"
      size="small"
      density="compact"
      rounded
    >
      <strong>インストールする</strong>
      <p class="text-medium-emphasis">
        「インストール」または「ホーム画面に追加」を選択して、SharerをPWAとしてインストールします
      </p>
      <p class="text-medium-emphasis">
        インストールが完了したら、Sharerのアプリは閉じて問題ありません
      </p>
    </v-timeline-item>
    <v-timeline-item
      dot-color="#eeeeee"
      size="small"
      density="compact"
      rounded
    >
      <strong>共有する ①</strong>
      <p class="text-medium-emphasis">
        ほかのアプリから「共有」ダイアログを開いたとき、共有したいアプリの代わりに「Sharer」を選択します
      </p>
    </v-timeline-item>
    <v-timeline-item
      dot-color="#eeeeee"
      size="small"
      density="compact"
      rounded
    >
      <strong>共有する ②</strong>
      <p class="text-medium-emphasis">
        共有したい内容を選択したら、「SHARE AS ...」を押して、共有したいアプリを選択します
      </p>
    </v-timeline-item>
  </v-timeline>
</template>
