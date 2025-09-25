import Appbar from "./Appbar";
import type { Blog } from "../hooks";
import { Avatar } from "./BlogCard";

const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <>
      <Appbar></Appbar>
      <div className="flex justify-center">
        <div className="grid grid-cols-12 w-full px-20 pt-20 max-w-screen-2xl">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-2">
              Posted on September 24th, 2025
            </div>
            <div className="pt-4">{blog.content}</div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-700 text-lg">Author</div>
            <div className="flex">
              <div className="flex flex-col justify-center">
                <Avatar name={blog.author.name || "Anonymous"} size="big" />
              </div>
              <div className="pl-3">
                <div className="text-2xl font-extrabold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                  Random catch phrase about the author's ability to grab the
                  user's attention
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullBlog;
