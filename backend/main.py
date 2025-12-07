import os

import uvicorn
from fastapi import FastAPI
from supabase import Client, create_client

app = FastAPI()
url: str = "https://tgijyfhrlpovvtkpocls.supabase.co"
key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnaWp5ZmhybHBvdnZ0a3BvY2xzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3MDY3NTUsImV4cCI6MjA3NzI4Mjc1NX0.lihzFgM7aV5K8WkwZ0efiCQOn__eZs8MVCC6nnpyyU0"
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
