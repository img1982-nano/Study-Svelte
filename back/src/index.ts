import { Elysia } from "elysia";
import { jwt } from '@elysiajs/jwt'
import { Codex } from "@openai/codex-sdk";

async function verifyAuth(jwt: any, auth: any, status: any) {
  const token = auth.value

  if (!token) {
    return status(401, "Unauthorized")
  }

  const verified = await jwt.verify(token)

  if (!verified) {
    return status(401, "Unauthorized")
  }

  return verified
}

const codex = new Codex();

const app =new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: process.env.SECRET
    })
  )
  .get("/", ({ status }) => {
    return {
      name: "Gakusyu Api System",
      author: "Azilamo",
      website: "https://gakusyu.azilamo.com",
      version: "0.0.1"}
  })
  .group("/api", (app) =>
    app
      .get("/ai/:prompt", async ({ params: { prompt }, jwt, status, cookie: { auth } }) => {
        try {
          const user = verifyAuth(jwt, auth, status)
          if (!user) return
          
          console.log(`Prompt:${prompt}`)
          
          const thread = codex.startThread();
          console.log(`Thread: ${thread}`)
          
          const result = await thread.run(prompt);
          console.log(`Result:${result}`)
          
          return {
            message: result.finalResponse,
            usage: result.usage
          }
        } catch (error) {
          return {
            error: error.message
          }
        }
      })
      .post('/cookie/add', async ({ jwt, body, status, cookie: { auth } }) => {
        const { id } = body as { id?: string }
        
        if (!id) {
          return status(400, 'Bad request')
        }
        const value = await jwt.sign({ id })
        
        auth.set({
          value,
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7
        })
        
        return {
          message: "Make cookie🍪",
          token: value
        }
      })
  )
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
