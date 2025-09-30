import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog';
import { commentRouter } from './routes/comment';
import { cors } from 'hono/cors';

const app = new Hono<{
  Bindings: {
    DATABASE_URL : string,
    JWT_SECRET : string,
  }
}>()

app.use(cors());
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);
app.route('/api/v1/comment', commentRouter);

app.get('/', (c) => {
  return c.text('Hello Hono!')
})



export default app;

//comments ko ya to paginate karna hai ya phir blog ki query ke sath milana hai taki 2 ki jagah 1 hi requet aaye backend pe ya phir hybrid krna hai jisme kuch initial comments blog ke sath fetch aur baki aaram se alag request se paginate honge ye best hai