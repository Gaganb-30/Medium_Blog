import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

// Blog interface
export interface Blog {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
  };
}

// Single blog hook
export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        });
        setBlog(res.data.blog);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  return { loading, blog };
};

// Multiple blogs hook
export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        });
        setBlogs(res.data.blogs || []);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return { loading, blogs };
};

// Comments types
export type CommentType = {
  id: number;
  content: string;
  createdAt: string;
  author?: {
    name?: string;
    avatar?: string;
  };
};

// Comments hook
export const useComments = (blogId: number) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [postingComment, setPostingComment] = useState(false);

  const fetchComments = async () => {
    setLoadingComments(true);
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/comment/blog/${blogId}`,{
          headers: {
            Authorization: localStorage.getItem("token") || "",
        }
      });
      setComments(res.data.comments || []);
    } catch (err) {
      console.error("Failed to fetch comments:", err);
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line
  }, [blogId]);

  const addComment = async (content: string) => {
    setPostingComment(true);
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/comment`,
        { content, blogId },
        {
          headers: {
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );
      await fetchComments();
    } catch (err) {
      console.error("Failed to add comment:", err);
    } finally {
      setPostingComment(false);
    }
  };

  return { comments, loadingComments, postingComment, addComment };
};


//comments ko ya to paginate karna hai ya phir blog ki query ke sath milana hai taki 2 ki jagah 1 hi requet aaye backend pe ya phir hybrid krna hai jisme kuch initial comments blog ke sath fetch aur baki aaram se alag request se paginate honge ye best hai