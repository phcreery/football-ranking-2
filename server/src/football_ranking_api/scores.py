import httpx


async def request(year: int):
    URL = f"https://api.collegefootballdata.com:443/games?year={year}&seasonType=regular"

    authorization = "Bearer NJRgktQC/FilkL37+s4ZSvckBKL/Iox5fw18DumOF+X8u2DntZqcJ44P9imkoG+t"

    headers = {
        "Authorization": authorization,
        "X-Requested-With": "https://peyton.creery.org/",
    }

    # response = await app.state.client.get(URL, headers=headers)
    # print(response)

    scores = {}
    async with httpx.AsyncClient() as client:
        resp = await client.get(URL, headers=headers)
        scores = resp.json()

        allowed_divisions = ["fbs", "fcs", "ii"]
        scores = [
            game
            for game in scores
            if (game["home_division"] in allowed_divisions)
            and (game["away_division"] in allowed_divisions)
        ]

    return {"scores": scores}
