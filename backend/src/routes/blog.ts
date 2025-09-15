import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createBlogInput, updateBlogInput } from "@gagan_30/medium-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL : string,
    JWT_SECRET : string,
  },
  Variables : {
    userId : any,
  }
}>();

blogRouter.use('/*', async (c, next) => {
  const header = c.req.header("Authorization");
  // console.log(header);
  if(!header){
    c.status(401);
    return c.json({error : "unauthorized"});
  }
  // console.log(header.split(' ')[1]);
  const jwt_payload = await verify(header.split(' ')[1], c.env.JWT_SECRET);
  console.log(jwt_payload);
  if(!jwt_payload){
    c.status(401);
    return c.json({error : "wrong credentials"});
  }
  c.set('userId', jwt_payload.id);
  await next();
})

//yaha pe pagination krna hai
blogRouter.get('/bulk', async (c) => {
  // const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.blog.findMany({
    select : {
      title : true,
      content : true,
      id : true,
      author : {
        select : {
          name : true
        }
      }
    }
  });
  
  return c.json({blogs : blogs});
})

blogRouter.get('/:id', async (c) => {
  const id = c.req.param('id');
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.blog.findUnique({
    where : {
      id :  Number(id),
    }
  });

  if(!blog){
    c.status(404);
    return c.json({error : "not found"});
  }

  return c.json(blog);
})


blogRouter.post('/', async (c) => {
  const body = await c.req.json();
  const {success} = createBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({error : "Invalid inputs"})
  }
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.blog.create({
    data : {
      title : body.title,
      content : body.content,
      authorId : authorId,
    }
  })
  return c.json({id : blog.id});
})

blogRouter.put('/', async (c) => {
  const body = await c.req.json();
  const {success} = updateBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({error : "Invalid inputs"})
  }
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.blog.update({
    where : {
      id : body.id,
    },
    data : {
      title : body.title,
      content : body.content,
    }
  });
  return c.json({ id : blog.id });
})