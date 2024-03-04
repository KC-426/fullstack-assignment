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

module.exports = router;
