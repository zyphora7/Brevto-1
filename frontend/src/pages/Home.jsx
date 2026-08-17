import React, { useEffect, useState } from "react";
import { getBlogsAPI } from "../services/api";
import BlogCard from "../components/BlogCard";
import BlogDetailModal from "../components/BlogDetailModal";

const Home = ({ blogs, setBlogs, loadingBlogs, setLoadingBlogs, blogError, setBlogError }) => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoadingBlogs(true);
      setBlogError("");
      try {
        const data = await getBlogsAPI();
        setBlogs(data);
      } catch (err) {
        console.error("Failed to load blogs:", err);
        setBlogError("Failed to load blogs. Please try again later.");
      } finally {
        setLoadingBlogs(false);
      }
    };

    fetchBlogs();
  }, [setBlogs, setLoadingBlogs, setBlogError]);

  return (
    <main className="container">
      {/* Hero Header */}
      <section className="hero">
        <h1 className="hero-title">
          Discover and Share <br />
          <span className="hero-gradient">Bite-Sized Stories</span>
        </h1>
        <p className="hero-subtitle">
          Welcome to Brevto. Read, write, and explore concise blogs from authors
          all around the world.
        </p>
      </section>

      {/* Blogs Listing Section */}
      <section className="blogs-section">
        <div className="section-header">
          <h2 className="section-title">Latest Articles</h2>
        </div>

        {loadingBlogs ? (
          <div className="state-container">
            <div className="spinner"></div>
            <div className="state-title">Loading Blogs</div>
            <p className="state-desc">Fetching the latest articles for you...</p>
          </div>
        ) : blogError ? (
          <div className="state-container">
            <div className="state-title" style={{ color: "var(--danger)" }}>
              Oops!
            </div>
            <p className="state-desc">{blogError}</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="state-container">
            <div className="state-title">No Blogs Found</div>
            <p className="state-desc">
              Be the first to share your story by logging in and creating a blog!
            </p>
          </div>
        ) : (
          <div className="blogs-grid">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                onClick={() => setSelectedBlog(blog)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Blog Details Modal */}
      {selectedBlog && (
        <BlogDetailModal
          blog={selectedBlog}
          onClose={() => setSelectedBlog(null)}
        />
      )}
    </main>
  );
};

export default Home;
