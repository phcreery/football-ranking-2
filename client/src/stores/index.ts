import { defineStore } from "pinia";
import { ref, Ref, watch } from "vue";
import { Score, Rank } from "../api";
import { getScores, getRanking } from "../api";

const thisYear = new Date().getFullYear();

interface State {
  scores: Ref<Score[]>;
  ranking: Ref<Rank[]>;
  year: Ref<number>;
  division: Ref<string>;
  divisionOptionsLabel: Ref<Label[]>;
  conference: Ref<string>;
  conferenceOptionsLabel: Ref<Label[]>;
  loading: Ref<boolean>;
  update: () => Promise<void>;
  updateFilters: () => void;
  updateDivisionFilter: (value: string, option: any) => void;
  updateConferenceFilter: (value: string, option: any) => void;
}

type Label = {
  label: string;
  value: string;
};

export const useStateStore = defineStore<"state", State>("state", () => {
  const allscores = ref<Score[]>([]);
  const scores = ref<Score[]>([]);
  const allranking = ref<Rank[]>([]);
  const ranking = ref<Rank[]>([]);
  const year = ref(thisYear);
  // division filter
  const division = ref<string>("All");
  const divisionOptions = ref<string[]>([]);
  const divisionOptionsLabel = ref<Label[]>([]);
  // conference filter
  const conference = ref<string>("All");
  const conferenceOptions = ref<string[]>([]);
  const conferenceOptionsLabel = ref<Label[]>([]);
  const loading = ref(true);

  function updateFilters() {
    scores.value = allscores.value;
    ranking.value = allranking.value;

    console.log("updateFilters");

    // get unique division and conference values
    divisionOptions.value = Array.from(
      new Set(scores.value.map((s) => s.home_division))
    );
    divisionOptionsLabel.value = divisionOptions.value.map((d) => {
      return { label: d, value: d };
    });
    // add "All" option
    divisionOptions.value.unshift("All");
    divisionOptionsLabel.value.unshift({ label: "All", value: "All" });

    // filter by division
    if (division.value !== "All") {
      scores.value = allscores.value.filter(
        (s) =>
          s.home_division === division.value &&
          s.away_division === division.value
      );
      ranking.value = allranking.value.filter(
        (r) => r.division === division.value
      );
    }

    conferenceOptions.value = Array.from(
      new Set(scores.value.map((s) => s.home_conference))
    );
    conferenceOptionsLabel.value = conferenceOptions.value.map((d) => {
      return { label: d, value: d };
    });
    // add "All" option
    conferenceOptions.value.unshift("All");
    conferenceOptionsLabel.value.unshift({ label: "All", value: "All" });

    // filter by conference
    if (conference.value !== "All") {
      scores.value = scores.value.filter(
        (s) =>
          s.home_conference === conference.value &&
          s.away_conference === conference.value
      );
      ranking.value = ranking.value.filter(
        (r) => r.conference === conference.value
      );
    }
  }

  function updateDivisionFilter(value: string, option: any) {
    division.value = value;
    conference.value = "All";
    updateFilters();
  }

  function updateConferenceFilter(value: string, option: any) {
    conference.value = value;
    updateFilters();
  }

  function updateScores() {
    scores.value = [];
    return getScores(year.value).then((res) => {
      console.log(res);
      allscores.value = res.scores;

      updateFilters();
    });
  }

  function updateRanking() {
    ranking.value = [];
    return getRanking(year.value).then((res) => {
      console.log(res);
      allranking.value = res;
      updateFilters();
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
    division,
    divisionOptionsLabel,
    conference,
    conferenceOptionsLabel,
    loading,
    update,
    updateFilters,
    updateDivisionFilter,
    updateConferenceFilter,
  };
});
