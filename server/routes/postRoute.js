const express = require("express");
const multer = require("multer");

const {
  createPost,
  getAllPosts,
  likeUnlikePost,
  deletePost,
  updatePost,
  getPost,
  commentPost,
} = require("../controllers/postController");

const router = express.Router();

// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Image upload route
router.post("/upload", upload.single("file"), (req, res) => {
  res.json({
    success: true,
    message: "Image uploaded successfully",
    imageUrl: `images/${req.file.filename}`,
  });
});

// Post-related routes
router.route("/").post(createPost).get(getAllPosts);

router.route("/:id").get(getPost).put(updatePost).delete(deletePost);

router.route("/:id/like").put(likeUnlikePost);

router.route("/:id/comment").put(commentPost);

module.exports = router;
