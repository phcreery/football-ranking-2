import { defineStore } from "pinia";
import { ref, Ref, watch } from "vue";
import { Score } from "../api";
import { getScores } from "../api";

const thisYear = new Date().getFullYear();

interface State {
  scores: Ref<Score[]>;
  year: Ref<number>;
  loading: Ref<boolean>;
}

export const useStateStore = defineStore<"state", State>("state", () => {
  const scores = ref<Score[]>([]);
  const year = ref(thisYear);
  const loading = ref(true);

  function updateScores() {
    scores.value = [];
    loading.value = true;
    getScores(year.value).then((res) => {
      console.log(res);
      scores.value = res.scores;
      loading.value = false;
    });
  }

  watch(year, (newYear) => {
    updateScores();
  });

  updateScores();

  return {
    scores,
    year,
    loading,
  };
});
