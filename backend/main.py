import json
import os

import bcrypt
import uvicorn
from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel
from supabase import Client, create_client

load_dotenv()
app = FastAPI()
url = os.environ["PUBLIC_SUPABASE_URL"]
key = os.environ["PUBLIC_SUPABASE_ANON_KEY"]
supabase: Client = create_client(url, key)
password = b"sfa273928baa"
hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())
print("ハッシュ化されたパスワード:", hashed_password)


@app.get("/")
async def root():
    return {"message": "よくここにたどり着いたのぉ"}


@app.get("/get/{any_db}")
def get_any(any_db: str):
    response = supabase.table(any_db).select("*").execute()
    return response.data


@app.get("/get/{any_db}/{any}/{any_1}")
def get_any_db(any_db: str, any: str, any_1: str):
    res = supabase.table(any_db).select("*").eq(any, any_1).execute()
    return res.data


# @app.xpost("/signup/{email}/{password}")
# def singup(su_email: str, su_password: str):


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="debug")
