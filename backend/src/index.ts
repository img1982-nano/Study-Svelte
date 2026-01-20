import { Elysia, t } from "elysia";
import mongo from "mongoose";
import { queryCoercions } from "elysia/dist/replace-schema";
import { Mondai } from "./config";  
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
app.get("/", () => "あじらもデモ用天気APi")
app.get("/aieu", async () => {
  const response = await Mondai.find()
  console.log(`User connect to /aieu, response to :${response}`)
  return response
})
//app.get("/api/db/:database/:collection",
//  ({ params: { database, collection } }) => {
//    mongo.
//  }
//)
startup()