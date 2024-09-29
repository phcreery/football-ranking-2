<template>
  <n-space vertical size="large">
    <!-- <n-flex> -->
    <!-- <n-grid x-gap="12" :cols="4"> -->
    <!-- <n-gi span="1">  -->
    <!-- <n-text>  -->
    <!-- Year: -->
    <!-- </n-text> -->
    <!-- </n-gi> -->
    <!-- <n-gi span="3"> -->
    <n-select v-model:value="year" :options="yearOptions" />
    <!-- </n-gi> -->
    <!-- </n-grid> -->
    <!-- </n-flex> -->
    <n-data-table
      ref="table"
      :columns="columns"
      :data="data"
      :pagination="false"
      :loading="loading"
      max-height="90vh"
    />
  </n-space>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  NDataTable,
  NSelect,
  NSpace,
  NFlex,
  NGrid,
  NGi,
  NText,
} from "naive-ui";
import {
  DataTableColumns,
  DataTableColumn,
  DataTableBaseColumn,
} from "naive-ui";
import { getScores } from "../api";
import type { Score } from "../api";

const thisYear = new Date().getFullYear();

const tableRef = ref(null);
const loading = ref(true);
const year = ref(thisYear);
const data = ref<Score[]>([]);

const years = Array.from({ length: 10 }, (_, i) => thisYear - i);
const yearOptions = years.map((year) => ({
  label: year.toString(),
  value: year,
}));

interface Column extends Omit<DataTableBaseColumn, "key"> {
  key: keyof Score;
}

const columns: Column[] = [
  {
    title: "Week",
    key: "week",
    defaultSortOrder: "ascend",
    sorter: "default",
    width: 80,
  },
  {
    title: "Date",
    key: "start_date",
    width: 180,
    render: (row: Score, index: number) => {
      return new Date(row.start_date).toLocaleDateString();
    },
  },
  {
    title: "Home Team",
    key: "home_team_stuff",
    align: "right",
    children: [
      // {
      //   title: "Logo",
      //   key: "home_team_logo",
      //   render: (row: Score, index: number) => {
      //     return h("img", {
      //       src: row.home_team_logo,
      //       alt: row.home_team,
      //       style: {
      //         width: "50px",
      //         height: "50px",
      //       },
      //     });
      //   },
      // },
      {
        title: "Name",
        key: "home_team",
        align: "right",
        width: 180,
      },

      {
        title: "Pts.",
        key: "home_points",
        align: "right",
        width: 60,
      },
    ],
  },
  {
    title: "Away Team",
    key: "away_team_stuff",
    align: "left",
    children: [
      // {
      //   title: "Logo",
      //   key: "away_team_logo",
      //   render: (row: Score, index: number) => {
      //     return h("img", {
      //       src: row.away_team_logo,
      //       alt: row.away_team,
      //       style: {
      //         width: "50px",
      //         height: "50px",
      //       },
      //     });
      //   },
      // },
      {
        title: "Pts.",
        key: "away_points",
        align: "left",
        width: 60,
      },
      {
        title: "Name",
        key: "away_team",
        align: "left",
        width: 180,
      },
    ],
  },
  // {
  //   title: "Completed",
  //   key: "completed",
  //   width: 180,
  // },
  {
    title: "Venue",
    key: "venue",
    align: "right",
    width: 180,
  },
];

const games = getScores(year.value).then((res) => {
  console.log(res);
  loading.value = false;
  data.value = res.scores;
  return res;
});
</script>
