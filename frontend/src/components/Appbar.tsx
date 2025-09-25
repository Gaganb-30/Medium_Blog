import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

const Appbar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link
        to={"/blogs"}
        className="flex flex-col justify-center text-xl cursor-pointer"
      >
        Medium
      </Link>
      {/* <div className="flex flex-col justify-center text-xl">Medium</div> */}
      <div>
        <Link to={"/publish"}>
          <button
            type="button"
            className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 shadow-lg shadow-lime-500/50 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mr-4"
          >
            New
          </button>
        </Link>
        <Avatar name="Gagan" size={"big"} />
      </div>
    </div>
  );
};
// baad me logout aur baki options add krne hai

export default Appbar;
