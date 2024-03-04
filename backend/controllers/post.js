const postSchema = require("../models/post");
const path = require('path')
const fs = require("fs")

const createPost = async (req, res) => {
  try {
    const { postBy, postName, about } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { filename, path } = req.file;

    const post = new postSchema({
      postBy,
      postName,
      about,
      image: {
        name: filename,
        path: path,
      },
    });

    const savedPost = await post.save();
    console.log(savedPost);

    return res.status(201).json({
      success: true,

      message: "Post created successfully",
      post: savedPost,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const retrievePost = async (req, res) => {
  try {
    const findPost = await postSchema.find();
    if (!findPost || findPost.length === 0) {
      return res.status(404).json({ message: "No Post found !!" });
    }

    let newList = []
    const updatedPosts = await Promise.all(findPost.map(async (ele) => {
      const imagePath = path.join(ele.image.path);
      try {
        const data = await fs.promises.readFile(imagePath);
        const base64Image = Buffer.from(data).toString('base64');

        return {...ele, fileContent: base64Image};
      } catch (err) {
        console.error('Error reading image file:', err);
        return ele;
      }
    }));

    // console.log(newList, updatedPosts)

    return res.status(200).json({ message: "Post retrieved !!", post: updatedPosts });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error !!" });
  }
};


exports.createPost = createPost;
exports.retrievePost = retrievePost;
