import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

interface Blogs {
  id : number
  title : string;
  content : string;
  author : {
    name : string;
  };
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blogs>([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
      headers : {
        authorization : localStorage.getItem("token"),
      }
    })
      .then((res) => {
        setBlogs(res.data.blogs);
        setLoading(false);
      })

  }, [])

  return {
    loading,
    blogs,
  }
}