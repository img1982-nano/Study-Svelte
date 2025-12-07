import os

import uvicorn
from fastapi import FastAPI
from supabase import Client, create_client

app = FastAPI()
url = os.environ["PUBLIC_SUPABASE_URL"]
key = os.environ["PUBLIC_SUPABASE_ANON_KEY"]
supabase: Client = create_client(url, key)


@app.get("/")
async def root():
    return {"message": "404 存在する分けねぇだろおおおおおおお"}


@app.get("/get/{any_db}")
def get_any(any_db: str):
    response = supabase.table(any_db).select("*").execute()
    return response.data


@app.get("/get/{any_db}/{any}/{any_1}")
def get_any_db(any_db: str, any: str, any_1: str):
    res = supabase.table(any_db).select("*").eq(any, any_1).execute()
    return res.data


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="debug")
