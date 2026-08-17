const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
      maxlength: [100, "Blog title cannot exceed 100 characters"]
    },
    content: {
      type: String,
      required: [true, "Blog content is required"],
      trim: true,
      maxlength: [256, "Blog content cannot exceed 256 characters"]
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author reference is required"]
    }
  },
  {
    timestamps: true 
  }
);

module.exports = mongoose.model("Blog", blogSchema);
