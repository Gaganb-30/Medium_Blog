import { useParams } from "react-router-dom";
import FullBlog from "../components/FullBlog";
import { useBlog } from "../hooks";
import FullBlogSkeleton from "../components/FullBlogSkeleton";
import { Comments } from "../components/Comments";

const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || "",
  });
  if (loading) {
    return <FullBlogSkeleton />;
  }
  return (
    <div>
      <FullBlog blog={blog} />
      <Comments blogId={blog.id} />
    </div>
  );
};

export default Blog;
