import React, { useEffect } from "react";
import { formatDate } from "./BlogCard";

const BlogDetailModal = ({ blog, onClose }) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!blog) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        <div className="detail-meta">
          <span>
            By <span className="detail-author">{blog.author?.name || "Anonymous"}</span>
          </span>
          <span>&bull;</span>
          <span>{formatDate(blog.createdAt)}</span>
        </div>
        <h2 className="detail-title">{blog.title}</h2>
        <div className="detail-content">{blog.content}</div>
      </div>
    </div>
  );
};

export default BlogDetailModal;
