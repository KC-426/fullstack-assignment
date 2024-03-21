const express = require("express");
const postController = require("../controllers/post");
const multer = require("multer");
const userAuth = require("./auth")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/create_post", upload.single("file"), postController.createPost);
router.get("/retrieve_post", userAuth, postController.retrievePost);
router.post("/like_post/:id", postController.likePost)
router.post('/share_post/:id', postController.sharePost)
router.post("/comment_on_post/:id", postController.commentOnPost)
router.post("/reply_on_comment/:id/:commentId", postController.addReplyOnComment)

module.exports = router;
