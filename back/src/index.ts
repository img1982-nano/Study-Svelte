import { Elysia } from "elysia";
import { jwt } from '@elysiajs/jwt'

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
      // コメントアウトした
      // 理由:別の処理で使うから
      /*.get("/about", async ({ jwt, status, cookie: { auth } }) => {
          const user = verifyAuth(jwt, auth, status)
          
          if (!user) return
          
        })*/
  )
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
