import React, { useState, useEffect } from "react";
import { createBlogAPI } from "../services/api";

const CreateBlogModal = ({ onClose, onBlogCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation checks
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }

    if (title.length > 100) {
      setError("Title must not exceed 100 characters");
      return;
    }

    if (content.length > 256) {
      setError("Content must not exceed 256 characters");
      return;
    }

    setIsSubmitting(true);
    try {
      const newBlog = await createBlogAPI(title, content);
      onBlogCreated(newBlog);
      onClose();
    } catch (err) {
      console.error("Failed to create blog:", err);
      const errMsg = err.response?.data?.message || "Something went wrong while publishing the blog";
      setError(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        <h2 className="form-title">Create Blog</h2>

        {error && <div className="form-error-alert">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="blog-title">
              Blog Title
            </label>
            <input
              id="blog-title"
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a catchy title..."
              disabled={isSubmitting}
            />
            <div className="char-counter">{title.length} / 100 characters</div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="blog-content">
              Blog Content
            </label>
            <textarea
              id="blog-content"
              className="form-input"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind? (Markdown supported)"
              disabled={isSubmitting}
            />
            <div className="char-counter">{content.length} / 256 characters</div>
          </div>

          <button
            type="submit"
            className="form-submit-btn"
            disabled={isSubmitting || !title.trim() || !content.trim() || title.length > 100 || content.length > 256}
          >
            {isSubmitting ? "Publishing..." : "Publish Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogModal;
