const {
  createPost,
  getAllPosts,
  likeUnlikePost,
  deletePost,
  updatePost,
  getPost,
  commentPost,
} = require("../controllers/postController");

const router = require("express").Router();
const multer = require("multer");

// Define multer storage and file filter
const storage = multer.memoryStorage(); //
const upload = multer({ storage: storage });

router.route("/image").post(upload.single("file"), async function (req, res) {
  try {
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Post routes
router.route("/").post(upload.single("image"), createPost).get(getAllPosts);

router.route("/:id/like").put(likeUnlikePost);

router.route("/:id/comment").put(commentPost);

router.route("/:id").put(updatePost).get(getPost).delete(deletePost);

module.exports = router;
