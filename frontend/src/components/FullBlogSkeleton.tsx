import Appbar from "./Appbar";

const FullBlogSkeleton = () => {
  return (
    <>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 w-full mx-20 mt-20 max-w-screen-2xl">
          <div className="col-span-8 mr-10">
            <div className="text-5xl font-extrabold">
              <div className="h-10 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div className="text-slate-500 pt-2">
              <div className="h-3 bg-gray-200 rounded-full mb-2.5 w-60"></div>
            </div>
            <div className="pt-4">
              <div className="h-3 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div className="pt-4">
              <div className="h-3 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div className="pt-4">
              <div className="h-3 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div className="pt-4">
              <div className="h-3 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
          </div>
          <div className="col-span-4 ml-5">
            <div className="text-slate-700 text-lg">
              <div className="h-3 bg-gray-200 rounded-full mb-2.5  w-40"></div>
            </div>
            <div className="flex">
              <div className="flex flex-col justify-center">
                <svg
                  className="w-10 h-10 text-gray-200 mx-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
              </div>
              <div className="pl-3">
                <div className="text-2xl font-extrabold">
                  <div className="h-4 bg-gray-200 rounded-full mb-2.5  w-40"></div>
                </div>
                <div className="pt-2 text-slate-500">
                  <div className="h-3 bg-gray-200 rounded-full mb-2.5 w-80"></div>
                  <div className="h-3 bg-gray-200 rounded-full mb-2.5 w-30"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullBlogSkeleton;
