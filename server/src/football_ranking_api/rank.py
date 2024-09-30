import numpy as np
from .config import logger

# import scipy
from scipy.linalg import null_space


def compute_ranking(M):
    # Sum of the columns in 1D matrix
    colsum = np.sum(M, axis=0)
    # Subtract games matrix with diagonal matrix of column sum
    diff = M - np.diag(colsum)
    # compute null-space matrix of the difference
    ranking_matrix = null_space(diff)
    # Take the absolute value of the array
    ranking_matrix = np.absolute(ranking_matrix)
    # print("ranking matrix", ranking_matrix)

    # Quick-fix for when null_space returns a matrix size of (x,>1) instead of expected (x,1)
    if ranking_matrix.shape[1] != 1:
        # print("uh oh, no bueno")
        new_ranking_matrix = np.array([])
        for row in ranking_matrix:
            best_cell = 0
            # print(row)
            for cell in row:
                if cell > best_cell:
                    best_cell = cell
            new_value = np.array([best_cell])
            # print(new_value)
            new_ranking_matrix = np.append(
                new_ranking_matrix, new_value, axis=0
            )
        # print("new matrix", len(new_ranking_matrix), new_ranking_matrix)
        ranking_matrix = new_ranking_matrix

    # Convert to a python List
    ranking = ranking_matrix.flatten().tolist()
    return ranking


def weird_division(n, d):
    return n / d if d else 0


def rank(data: dict):
    logger.info("Ranking data")
    # logger.info(data)
    # Generate Teams list
    teams = []
    for game in data:
        if game["home_team"] not in teams:
            teams.append(game["home_team"])

        if game["away_team"] not in teams:
            teams.append(game["away_team"])

    # Generate game matrix
    M_offense = np.zeros((len(teams), len(teams)), dtype=int)
    for game in data:
        i = teams.index(game["home_team"])
        j = teams.index(game["away_team"])
        M_offense[i, j] = (
            game["home_points"] if game["home_points"] != None else 0
        )
        M_offense[j, i] = (
            game["away_points"] if game["away_points"] != None else 0
        )
    M_defense = np.transpose(M_offense)

    RankO = compute_ranking(M_offense)
    RankD = compute_ranking(M_defense)
    ranking = [weird_division(i, j) for i, j in zip(RankO, RankD)]

    # Create dict and combine values of teams and ranking
    # ranking_dict = {}
    # print(ranking)
    # for i, rank in enumerate(ranking):
    #     ranking_dict[teams[i]] = rank

    # Create array of teams and ranking
    ranking_dict = [
        {"team": team, "rating": rank} for team, rank in zip(teams, ranking)
    ]

    # Sort the array by rating
    ranking_dict = sorted(ranking_dict, key=lambda k: k["rating"], reverse=True)
    # add rank to the dict
    for i, team in enumerate(ranking_dict):
        team["rank"] = i + 1

    # print(ranking_dict)
    return ranking_dict
