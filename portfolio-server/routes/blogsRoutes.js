const upload = require("../config/multer");
const {
  createBlog,
  getBlogs,
  getBlogBySlug,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogsController");

const router = require("express").Router();

router.post("/", upload.single("coverImage"), createBlog);
router.get("/", getBlogs);
router.get("/:slug/slug", getBlogBySlug);
router.get("/:id", getBlogById);
router.patch("/:id", upload.single("coverImage"),updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
