const Blog = require("../models/Blog");

const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    if (title.length > 100) {
      return res.status(400).json({ message: "Blog title cannot exceed 100 characters" });
    }

    if (content.length > 256) {
      return res.status(400).json({ message: "Blog content cannot exceed 256 characters" });
    }

    const blog = await Blog.create({
      title,
      content,
      author: req.user._id
    });

 
    const populatedBlog = await Blog.findById(blog._id).populate("author", "name");

    return res.status(201).json(populatedBlog);
  } catch (error) {
    console.error("Create Blog Error:", error.message);
    return res.status(500).json({ message: "Server error while creating blog" });
  }
};


const getAllBlogs = async (req, res) => {
  try {
    
    const blogs = await Blog.find()
      .populate("author", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json(blogs);
  } catch (error) {
    console.error("Get All Blogs Error:", error.message);
    return res.status(500).json({ message: "Server error while fetching blogs" });
  }
};


const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid blog ID format" });
    }

    const blog = await Blog.findById(id).populate("author", "name");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json(blog);
  } catch (error) {
    console.error("Get Blog By ID Error:", error.message);
    return res.status(500).json({ message: "Server error while fetching blog details" });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById
};
