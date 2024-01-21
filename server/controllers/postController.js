const Post = require("../models/Post");
const multer = require("multer");
const path = require("path");

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

const createPost = upload.single("file", async (req, res) => {
  try {
    const { title, description, user } = req.body;

    // Check if image file exists
    const imageUrl = req.file ? `images/${req.file.filename}` : null;

    const newPost = await Post.create({
      title,
      description,
      user,
      image: imageUrl,
    });

    res.status(201).json({
      message: "New Post created",
      data: newPost,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.json({ message: error.message, success: false });
  }
});

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "_id username",
      })
      .populate({
        path: "likes",
        select: "_id username",
      })
      .populate({
        path: "comments.user",
        select: "_id username",
      });

    res
      .status(200)
      .json({ message: `All Posts fetched`, data: posts, success: true });
  } catch (error) {
    res.json({ message: error, success: false });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.json({ message: error, success: false });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post?.userId === req.body.userId) {
      await post.deleteOne();
      res
        .status(200)
        .json({ success: true, message: "the post has been deleted" });
    } else {
      res.status(403).json("failed");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updatePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
    });

    if (!updatedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    return res.status(200).json({ success: true, post: updatedPost });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const likeUnlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });

      res
        .status(200)
        .json({ success: true, message: "The post has been liked" });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });

      res
        .status(200)
        .json({ success: true, message: "The post has been disliked" });
    }
  } catch (error) {
    res.json({ message: error, success: false });
  }
};

const commentPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    post.comments.push({
      user: req.body.userId,
      text: req.body.text,
    });

    await post.save();

    res
      .status(200)
      .json({ message: "The post has been commented", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
module.exports = {
  createPost,
  getAllPosts,
  getPost,
  likeUnlikePost,
  deletePost,
  updatePost,
  commentPost,
};
