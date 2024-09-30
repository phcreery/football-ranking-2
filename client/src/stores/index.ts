import { defineStore } from "pinia";
import { ref, Ref, watch } from "vue";
import { Score, Rank } from "../api";
import { getScores, getRanking } from "../api";

const thisYear = new Date().getFullYear();

interface State {
  scores: Ref<Score[]>;
  ranking: Ref<Rank[]>;
  year: Ref<number>;
  loading: Ref<boolean>;
  update: () => Promise<void>;
}

export const useStateStore = defineStore<"state", State>("state", () => {
  const scores = ref<Score[]>([]);
  const ranking = ref<Rank[]>([]);
  const year = ref(thisYear);
  const loading = ref(true);

  function updateScores() {
    scores.value = [];
    return getScores(year.value).then((res) => {
      console.log(res);
      scores.value = res.scores;
    });
  }

  function updateRanking() {
    ranking.value = [];
    return getRanking(year.value).then((res) => {
      console.log(res);
      ranking.value = res;
    });
  }

  async function update() {
    loading.value = true;
    console.log("updating");
    await Promise.all([updateScores(), updateRanking()])
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        loading.value = false;
        console.log("done");
      });
  }

  watch(year, (newYear) => {
    update();
  });

  update();

  return {
    scores,
    ranking,
    year,
    loading,
    update,
  };
});
