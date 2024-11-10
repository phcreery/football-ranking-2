import { config } from "./config.ts";

console.log(config);

const URL = `${config.PROTOCOL}://${config.BACKEND}:${config.PORT}${config.BASEURL}`;

export interface Score {
  id: number;
  season: number;
  week: number;
  season_type: string;
  start_date: string;
  start_time_tbd: boolean;
  completed: boolean;
  neutral_site: boolean;
  conference_game: boolean;
  attendance: number;
  venue_id: number;
  venue: string;
  home_id: number;
  home_team: string;
  home_conference: string;
  home_division: string;
  home_points: number;
  home_line_scores: number[];
  home_post_win_prob: number;
  home_pregame_elo: number;
  home_postgame_elo: number;
  away_id: number;
  away_team: string;
  away_conference: string;
  away_division: string;
  away_points: number;
  away_line_scores: number[];
  away_post_win_prob: number;
  away_pregame_elo: number;
  away_postgame_elo: number;
  excitement_index: number;
  highlights: string;
  notes: string;
}

export interface Rank {
  team: string;
  rating: number;
  rank: number;
  division: string;
  conference: string;
}

export interface ScoreResponse {
  scores: Score[];
}

export type RankingResponse = Rank[];

export function getScores(year: number): Promise<ScoreResponse> {
  console.log(URL);
  return fetch(`${URL}/scores/${year}`).then((response) => response.json());
}

export function getRanking(year: number): Promise<RankingResponse> {
  return fetch(`${URL}/ranking/${year}`).then((response) => response.json());
}
