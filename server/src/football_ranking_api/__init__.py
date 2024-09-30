import uvicorn
from fastapi import FastAPI, HTTPException
from .config import logger, uvicorn_config
import httpx
import asyncio
from .scores import request
from .rank import rank

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/scores/{year}")
async def get_scores(year: int):
    try:
        scores = await request(year)
        return scores
    except Exception as e:
        logger.error(f"Error: {e}")
        # scores = {"error": f"Error: {e}"}
        raise HTTPException(status_code=400, detail=f"Error: {e}")


@app.get("/ranking/{year}")
async def get_ranking(year: int):
    try:
        scores = await request(year)
        ranking_dict = rank(scores["scores"])
        return ranking_dict

    except Exception as e:
        logger.error(f"Error: {e}")
        # scores = {"error": f"Error: {e}"}
        raise HTTPException(status_code=400, detail=f"Error: {e}")


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
