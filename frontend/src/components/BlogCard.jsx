import React from "react";

// Robust date formatter: formats date as "Jan 01, 2022"
export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const month = months[date.getMonth()];
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

const BlogCard = ({ blog, onClick }) => {
  return (
    <div className="blog-card" onClick={onClick}>
      <div className="blog-card-meta">
        <span className="blog-card-author">
          By {blog.author?.name || "Anonymous"}
        </span>
        <span>{formatDate(blog.createdAt)}</span>
      </div>
      <h3 className="blog-card-title">{blog.title}</h3>
      <p className="blog-card-content">{blog.content}</p>
      <div className="blog-card-footer">
        Read Full Blog
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginLeft: "0.25rem", transition: "inherit" }}
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </div>
    </div>
  );
};

export default BlogCard;
