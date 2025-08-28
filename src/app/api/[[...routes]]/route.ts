import { Hono } from "hono"
import { handle } from "hono/vercel"

// export const runtime = 'edge' // default nodejs

const app = new Hono().basePath("/api")

app.get("/", (c) => {
  return c.text("Hello Hono!")
})

// Export handlers for all methods
export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)
