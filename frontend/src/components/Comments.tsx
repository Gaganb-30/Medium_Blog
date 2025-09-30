import React, { useState } from "react";
import { useComments } from "../hooks";
import CommentList from "./CommentList";

export function Comments({ blogId }: { blogId: number }) {
  const [content, setContent] = useState("");
  const { comments, loadingComments, postingComment, addComment } =
    useComments(blogId);

  async function handleAddComment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!content.trim()) return;

    const newContent = content;
    setContent(""); // optimistic clear

    try {
      await addComment(newContent);
    } catch (err) {
      setContent(newContent); // rollback if failed
      console.error("Failed to add comment:", err);
    }
  }

  return (
    <div className="flex justify-center">
      <section className="w-screen max-w-screen-lg bg-white py-8 lg:py-16 antialiased">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
              Discussion ({comments.length})
            </h2>
          </div>

          {/* Comment Form */}
          <form className="mb-6" onSubmit={handleAddComment}>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                placeholder="Write a comment..."
                required
              />
            </div>
            <button
              type="submit"
              disabled={postingComment}
              className={`inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white 
                ${
                  postingComment
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-700 hover:bg-blue-800"
                } 
                rounded-lg focus:ring-4 focus:ring-blue-200`}
            >
              {postingComment ? "Posting..." : "Post comment"}
            </button>
          </form>
        </div>

        {/* Comment List */}
        <div className="clist space-y-4">
          {loadingComments ? (
            // Skeleton loaders
            <>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-4 border border-gray-200 rounded-lg animate-pulse"
                >
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
                    <div className="h-3 bg-gray-300 rounded w-32"></div>
                  </div>
                  <div className="h-3 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                </div>
              ))}
            </>
          ) : comments.length === 0 ? (
            <p className="text-gray-500">No comments yet. Be the first!</p>
          ) : (
            comments.map((c) => (
              <CommentList
                key={c.id}
                content={c.content}
                name={c.author?.name}
                createdAt={c.createdAt} // ✅ Pass createdAt
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
