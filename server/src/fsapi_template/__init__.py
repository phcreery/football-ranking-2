import uvicorn
from fastapi import FastAPI, HTTPException
from .config import logger, uvicorn_config
from contextlib import asynccontextmanager
import httpx
import asyncio

app = FastAPI()


# @app.on_event("startup")
# async def startup_event():
#     app.state.client = httpx.AsyncClient()


# @app.on_event("shutdown")
# async def shutdown_event():
#     await app.state.client.aclose()


@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.client = httpx.AsyncClient()
    yield
    await app.state.client.aclose()


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
        # scores = resp

    return {"scores": scores}


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/scores/{year}")
async def get_scores(year: int):
    try:
        scores = await request(year)
        # print(scores)
        return scores
    except Exception as e:
        logger.error(f"Error: {e}")
        # scores = {"error": f"Error: {e}"}
        raise HTTPException(status_code=400, detail=f"Error: {e}")


@app.get("/fib")
def fib(n: int):
    if n <= 0:
        return 0
    elif n == 1 or n == 2:
        return 1
    else:
        return fib(n - 1) + fib(n - 2)


def main() -> int:  # pragma: no cover
    logger.info("Start ... ")
    try:
        uvicorn.run(
            app=uvicorn_config.app,
            host=uvicorn_config.host,
            port=uvicorn_config.port,
            reload=uvicorn_config.reload,
            reload_includes=(
                uvicorn_config.reload_includes
                if uvicorn_config.reload
                else None
            ),
            log_level=uvicorn_config.log_level,
        )

        return 0
    except KeyboardInterrupt:
        logger.info("Done ...")
        return 1
