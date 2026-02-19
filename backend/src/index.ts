//Library
import { Elysia, t } from "elysia";
import mongo from "mongoose";
import { createWorker } from "tesseract.js";
import { queryCoercions } from "elysia/dist/replace-schema";
import { Mondai, test_collection } from "./config";
//variable
const worker = await createWorker("eng+jpn")
const app = new Elysia()
const mongodb_password = process.env.MONGODB_PASSWORD
//function
async function startup() {
  try {
    // MongoDBに接続
    await mongo.connect(`mongodb+srv://azilamo:${mongodb_password}@cluster0.dyt4o.mongodb.net/test?appName=Cluster0`)
    console.log("[BACKEND] connect to database compleat")
    // APiサーバーを起動
    app.listen(3000)
    console.log(
      `[BACKEND] startup to http://${app.server?.hostname}:${app.server?.port}`
    );
  } catch (error) {
    console.error(`[BACKEND] Mongodb Connect Failed Error: ${error}`)
    process.exit(1)
  }
}
async function image_ocr(image: Blob) {
  // Tesseractを使用したOCRの関数
  const image_data = await image.arrayBuffer()
  const { data: { text } } = await worker.recognize(Buffer.from(image_data))
  const response = text
  await worker.terminate()
  // レスポンスから空白を削除して返す
  return text.replace(/\s/g, "")
}
//api
app.get("/", () => "FuckYou")
app.get("/api/db/Mondai", async () => {
  const response = await Mondai.find()
  console.log(`User connect to /api/db/Mondai, response to :${response}`)
  return response
}, {
  query: t.Object({
    collection: t.String()
  })
})
app.post("/api/ocr", async ({ body }) => {
  // OCRの関数を呼び出す
  const response = await image_ocr(body.file)
  console.log(response)
  return response
}, {
  //Schema
  body: t.Object({
    file: t.File({ format: "image/*" })
  })
})
app.get("/api/get", async ({ query }) => {
  //MongoDbから特定のコレクションのデータをすべて取得
  //{url}/api/test_2?collection={データベースのコレクション名}
  const response = await mongo.connection.collection(query.collection).find({}).toArray()
  console.log(`User connect to test_2 api`)
  return response
}, {
  query: t.Object({
    collection: t.String()
  })
})
//app.get("/api/db/:database/:collection",
//  ({ params: { database, collection } }) => {
//    mongo.
//  }
//)

//startup
startup()
