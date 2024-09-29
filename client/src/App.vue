<template>
  <n-config-provider :theme="lightTheme">
    <n-space vertical size="large">
      <n-layout embedded content-style="padding: 14px;" class="fill-screen">
        <n-layout-header> <h1>College Football Ranking</h1></n-layout-header>
        <n-layout-content content-style="padding: 14px;">
          <n-space vertical size="large">
            <n-select v-model:value="state.year" :options="yearOptions" />
            <n-tabs type="line" animated default-value="scores">
              <n-tab-pane name="scores" tab="Scores">
                <Table />
              </n-tab-pane>
              <n-tab-pane name="ranking" tab="Ranking"> Ranking </n-tab-pane>
            </n-tabs>
          </n-space>
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
  NSpace,
  NCard,
  NConfigProvider,
  NTabs,
  NTabPane,
  NSelect,
  darkTheme,
  lightTheme,
} from "naive-ui";
import Table from "./components/Table.vue";
import { useStateStore } from "./stores";

const state = useStateStore();

const thisYear = new Date().getFullYear();
const years = Array.from({ length: 10 }, (_, i) => thisYear - i);
const yearOptions = years.map((year) => ({
  label: year.toString(),
  value: year,
}));
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
