import { Elysia, t } from "elysia";
import mongo from "mongoose";
import { createWorker } from "tesseract.js";
import { queryCoercions } from "elysia/dist/replace-schema";
import { Mondai, test_collection } from "./config";

const worker = await createWorker("eng+jpn")
const app = new Elysia()
const mongodb_password = process.env.MONGODB_PASSWORD
async function startup() {
  try {
    await mongo.connect(`mongodb+srv://azilamo:${mongodb_password}@cluster0.dyt4o.mongodb.net/test?appName=Cluster0`)
    console.log("[BACKEND] connect to database compleat")
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
  const image_data = await image.arrayBuffer()
  const { data: { text } } = await worker.recognize(Buffer.from(image_data))
  const response = text
  await worker.terminate()
  return text.replace(/\s/g, "")
}
app.get("/", () => "バックエンドAPIサーバー")
/*app.get("/api/test", async () => {
  const response = await Mondai.find()
  console.log(`User connect to /aieu, response to :${response}`)
  return response
}, {
  query: t.Object({
    collection: t.String()
  })
  })*/
app.post("/api/ocr", async ({ body }) => {
  const response = await image_ocr(body.file)
  console.log(response)
  return response
}, {
  body: t.Object({
    file: t.File({ format: "image/*" })
  })
})
app.get("/api/test_2", async ({ query }) => {
  const response = await mongo.connection.collection(query.collection).find({}).toArray()
  console.log(`User connect to test_2 api, response to :${response}`)
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
startup()
