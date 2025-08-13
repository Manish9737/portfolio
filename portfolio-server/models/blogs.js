const { default: mongoose } = require("mongoose");

const blogsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      trim: true,
    },
    coverImage: {
      type: String,
      default: "/uploads/placeholder-blog.jpg",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    author: {
      type: String,
      default: "Admin",
    },
  },
  { timestamps: true }
);

const Blogs = mongoose.model("Blogs", blogsSchema);
module.exports = Blogs;
