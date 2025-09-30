import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const commentRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Middleware: auth for protected routes
commentRouter.use("/*", async (c, next) => {
  const header = c.req.header("Authorization");
  if (!header) {
    c.status(401);
    return c.json({ error: "Unauthorized" });
  }

  const token = header.startsWith("Bearer ") ? header.split(" ")[1] : header;
  const jwt_payload = await verify(token, c.env.JWT_SECRET);

  if (!jwt_payload || !jwt_payload.id) {
    c.status(401);
    return c.json({ error: "Invalid token" });
  }

  c.set("userId", jwt_payload.id as string);
  await next();
});

// Get comments for a blog (public route, no auth)
commentRouter.get("/blog/:blogId", async (c) => {
  const blogId = Number(c.req.param("blogId"));
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const comments = await prisma.comment.findMany({
    where: { blogId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      content: true,
      createdAt: true,
      author: { select: { name: true, avatar: true } },
    },
  });

  return c.json({ comments });
});

// Create a comment
commentRouter.post("/", async (c) => {
  const body = await c.req.json();
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const comment = await prisma.comment.create({
    data: {
      content: body.content,
      blogId: body.blogId,
      authorId: userId,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
      author: { select: { name: true, avatar: true } },
    },
  });

  return c.json({ comment });
});

// Delete a comment
commentRouter.delete("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const comment = await prisma.comment.findUnique({ where: { id } });
  if (!comment || comment.authorId !== userId) {
    c.status(403);
    return c.json({ error: "Not allowed" });
  }

  await prisma.comment.delete({ where: { id } });
  return c.json({ success: true, id });
});
