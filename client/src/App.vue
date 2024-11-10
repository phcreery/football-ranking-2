<template>
  <n-config-provider :theme="lightTheme">
    <n-space vertical size="large">
      <n-layout embedded content-style="padding: 14px;" class="fill-screen">
        <n-layout-header> <h1>College Football Ranking</h1></n-layout-header>
        <n-layout-content content-style="padding: 14px;">
          <n-space vertical size="large">
            Year:
            <n-select v-model:value="state.year" :options="yearOptions" />
            Division:
            <n-select
              v-model:value="state.division"
              :options="state.divisionOptionsLabel"
              :on-update:value="state.updateDivisionFilter"
            />
            Conference:
            <n-select
              v-model:value="state.conference"
              :options="state.conferenceOptionsLabel"
              :on-update:value="state.updateConferenceFilter"
            />
            <n-button @click="state.update()">Reload</n-button>
            <n-tabs type="line" animated default-value="scores">
              <n-tab-pane name="scores" tab="Scores">
                <Scores />
              </n-tab-pane>
              <n-tab-pane name="ranking" tab="Ranking">
                <Ranking />
              </n-tab-pane>
            </n-tabs>
          </n-space>
        </n-layout-content>
        * Division iii is not included in the data
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
  NConfigProvider,
  NTabs,
  NTabPane,
  NSelect,
  NButton,
  darkTheme,
  lightTheme,
} from "naive-ui";
import Scores from "./components/Scores.vue";
import Ranking from "./components/Ranking.vue";
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
