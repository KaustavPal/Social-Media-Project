const express = require("express");

const router = express.Router();

const postsController = require("../controllers/posts");

router.get("/", postsController.getMainPage);

router.get("/posts", postsController.getPosts);

router.get("/comments", postsController.getComments);

router.post("/comments", postsController.addComments);

// router.get("/get-post/:id", postsController.getPost);

router.post("/add-posts", postsController.addPosts);

module.exports = router;
