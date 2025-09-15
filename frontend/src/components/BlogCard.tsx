import { Link } from "react-router-dom";

interface BlogCardProps {
  id : number
  authorName : string;
  title : string;
  content : string;
  publishDate : string;  
}

const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishDate,
} : BlogCardProps) => {
  return (
    <Link to={`blog/${id}`}>
      <div className="border-b-2 border-slate-200 p-4 w-screen max-w-screen-sm cursor-pointer">
        <div className="flex">
          <Avatar name={authorName} />
          <div className="pl-2 text-sm flex justify-center flex-col">
            {authorName}
          </div>
          <div className="flex justify-center flex-col pl-2">
            <Circle />
          </div>
          <div className="font-light pl-2 text-slate-500 text-sm flex flex-col justify-center">
            {publishDate}
          </div>
        </div>
        <div className="text-2xl font-semibold pt-2">
          {title}
        </div>
        <div className="text-md ">
          {content.slice(0, 100) + "..."}
        </div>
        <div className="text-slate-600 text-sm font-thin pt-4">
          {`${Math.ceil(content.length / 200)} min read`}
        </div>
        {/* <div className="bg-slate-200 h-1 w-full"></div> */}
      </div>
    </Link>
  )
}

function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-400">

  </div>
}

export function Avatar({name, size = "small"} : {name : string; size? : "small" | "big"}){
  return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${size === "small" ? "w-6 h-6" : "w-10 h-10" }`}>
    <span className={`text-gray-600 dark:text-gray-300 font text-${size === "small" ? "sm" : "xl" }`}>{name[0]}</span>
</div>
}



export default BlogCard
