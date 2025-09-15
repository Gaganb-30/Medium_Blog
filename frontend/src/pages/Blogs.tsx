import Appbar from "../components/Appbar"
import BlogCard from "../components/BlogCard"
import { useBlogs } from "../hooks"

//is page pe righr side kuch add krna aue blogs ko left me dalna hai page bada khali khali sa hai abhi

const Blogs = () => {
  const {loading, blogs} = useBlogs();
  if(loading){
    // skeleton add krna hai yaha pe mujhe baad me
    return <div>
      loading ...
    </div>
  }
  return (
    <>
      <Appbar />
      <div className="flex justify-center">
        <div className="">
          {blogs.map( blog => <BlogCard key={blog.id} id={blog.id} authorName={blog.author.name || "Anonymous"} title={blog.title} content={blog.content} publishDate={"15th Sep 2025"} />)}
          {/* <BlogCard authorName={"Gagan"} title={"How an Ugly Single-Page Website Makes $5,000 a Month with Affiliate Marketing"} content={"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat dicta necessitatibus quidem nobis vero aliquam doloremque a non aliquid, illo ab eius provident sequi optio maxime fuga culpa perspiciatis suscipit quam? Ut tempora cumque porro eius, molestias hic veniam officiis quae aspernatur ducimus quas omnis aliquid non aut atque animi?"
          } publishDate={"15th Sep 2025"} /> */}
        </div>
      </div>
    </>
  )
}

export default Blogs
