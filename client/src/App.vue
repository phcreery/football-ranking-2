<template>
  <n-config-provider :theme="lightTheme">
    <n-space vertical size="large">
      <n-layout embedded content-style="padding: 14px;" class="fill-screen">
        <n-layout-header> <h1>College Football Ranking</h1></n-layout-header>
        <n-layout-content content-style="padding: 14px;">
          <n-tabs type="line" animated default-value="scores">
            <n-tab-pane name="scores" tab="Scores">
              <Table />
            </n-tab-pane>
            <n-tab-pane name="ranking" tab="Ranking"> Ranking </n-tab-pane>
          </n-tabs>
        </n-layout-content>
        <n-layout-footer style="height: 64px; padding: 24px"
          >App created by Peyton Creery</n-layout-footer
        >
      </n-layout>
    </n-space>
  </n-config-provider>
</template>

<script setup lang="ts">
import {
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NLayoutSider,
  NSpace,
  NCard,
  NConfigProvider,
  NTabs,
  NTabPane,
  darkTheme,
  lightTheme,
} from "naive-ui";
import Table from "./components/Table.vue";
</script>

<style scoped>
.fill-screen {
  min-height: 100vh;
}

.n-layout-header,
.n-layout-footer {
  padding: 12px;
}

.n-layout-content {
  height: 100%;
}
</style>
