<template>
  <n-data-table
    ref="table"
    :columns="columns"
    :data="state.ranking"
    :pagination="false"
    :loading="state.loading"
    max-height="90vh"
  />
</template>

<script setup lang="ts">
import { NDataTable } from "naive-ui";
import { DataTableBaseColumn } from "naive-ui";
import type { Rank } from "../api";
import { useStateStore } from "../stores";

const state = useStateStore();
// const table = ref(null);

interface Column extends Omit<DataTableBaseColumn, "key"> {
  key: keyof Rank;
}

const columns: Column[] = [
  {
    title: "Team",
    key: "team",
    sorter: "default",
    width: 180,
  },
  {
    title: "Rank",
    key: "rank",
    defaultSortOrder: "ascend",
    sorter: "default",
    width: 80,
  },
  {
    title: "(Rating)",
    key: "rating",
    sorter: "default",
    width: 180,
  },
];
</script>
