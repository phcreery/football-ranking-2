<template>
  <n-data-table
    ref="table"
    :columns="columns"
    :data="state.scores"
    :pagination="false"
    :loading="state.loading"
    max-height="90vh"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { NDataTable } from "naive-ui";
import { DataTableBaseColumn } from "naive-ui";
import type { Score } from "../api";
import { useStateStore } from "../stores";

const state = useStateStore();
// const table = ref(null);

interface Column extends Omit<DataTableBaseColumn, "key"> {
  key: keyof Score | "home_team_stuff" | "away_team_stuff";
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
</script>
