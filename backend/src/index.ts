import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Bindings } from 'hono/types'

const app = new Hono<{
  Bindings: {
    DATABASE_URL : string,
  }
}>()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/v1/blog/:id', (c) => {
  return c.text("in get from id");
})

app.get('/api/v1/blog/bulk', (c) => {
  return c.text("in bulk");
})

app.post('/api/v1/user/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  await prisma.user.create({
    data : {
      email : body.email,
      password : body.password,
    }
  })
  return c.text("in signup");
})

app.post('/api/v1/user/signin', (c) => {
  return c.text("in signin");
})

app.post('/api/v1/blog', (c) => {
  return c.text("in post blog");
})

app.put('/api/v1/blog', (c) => {
  return c.text("in put blog");
})

export default app
