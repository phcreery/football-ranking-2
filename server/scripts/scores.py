import httpx
import asyncio


async def request(year: int):
    URL = f"https://api.collegefootballdata.com:443/games?year={year}&seasonType=regular"

    authorization = "Bearer NJRgktQC/FilkL37+s4ZSvckBKL/Iox5fw18DumOF+X8u2DntZqcJ44P9imkoG+t"

    headers = {
        "accept": "application/json",
        "Authorization": authorization,
        "X-Requested-With": "https://peyton.creery.org/",
    }

    scores = {}
    async with httpx.AsyncClient() as client:
        resp = await client.get(URL, headers=headers)
        scores = resp.json()
    print(scores)
    return scores


if __name__ == "__main__":
    asyncio.run(request(2021))
