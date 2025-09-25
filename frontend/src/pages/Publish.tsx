import axios from "axios";
import Appbar from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="max-w-screen-lg w-full pt-10 mx-7">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Title
          </label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter blog title"
          />
          <TextEditor onChange={(e) => setContent(e.target.value)} />
          <button
            type="submit"
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                {
                  title,
                  content,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              );
              navigate(`/blog/${response.data.id}`);
            }}
            className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};

function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <div className="w-full mt-4">
        <div className="flex items-center justify-between border border-gray-200 rounded-md">
          <div className="py-2 bg-white rounded-b-lg w-full rounded-md">
            <label className="sr-only">Publish post</label>
            <textarea
              onChange={onChange}
              id="editor"
              rows={8}
              className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2"
              placeholder="Write an article..."
              required
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Publish;
