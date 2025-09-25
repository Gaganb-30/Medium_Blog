import { useParams } from "react-router-dom";
import FullBlog from "../components/FullBlog";
import { useBlog } from "../hooks";
import FullBlogSkeleton from "../components/FullBlogSkeleton";

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
    </div>
  );
};

export default Blog;
