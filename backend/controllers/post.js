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

const likePost = async (req, res) => {
  const { id } = req.params;
  try {
    const findPost = await postSchema.findById(id);
    if (!findPost) {
      return res.status(404).json({ message: "No post found!" });
    }

    findPost.likes++;
    await findPost.save();
    res
      .status(200)
      .json({ message: "Post liked successfully!", likes: findPost.likes });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error !!" });
  }
};

const sharePost = async (req, res) => {
  const { id } = req.params;
  try {
    const findPost = await postSchema.findById(id);
    if (!findPost) {
      return res.status(404).json({ message: "No post found!" });
    }

    findPost.shares++;
    await findPost.save();
    res
      .status(200)
      .json({ message: "Post shared successfully!", shares: findPost.shares });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error !!" });
  }
};

const commentOnPost = async (req, res) => {
  const { id } = req.params;
  const { commentedBy, commentedData } = req.body;
  try {
    const findPost = await postSchema.findById(id);
    if (!findPost) {
      return res.status(404).json({ message: "No post found!" });
    }

    const newComment = {
      commentedBy: commentedBy,
      commentedData: commentedData,
    };

    findPost.comments.push(newComment);
    const result = await findPost.save();

    console.log(result);
    res.status(201).json({ message: "Comment added successfully !", result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error !!" });
  }
};

const addReplyOnComment = async (req, res) => {
  const {id, commentId } = req.params
  const {repliedBy, repliedData} = req.body
  try {
    const findPost = await postSchema.findById(id);
    if (!findPost) {
      return res.status(404).json({ message: "No post found!" });
    }

    const findComment = findPost.comments.find(comment => comment._id.toString() === commentId);
    if (!findComment) {
      return res.status(404).json({ message: "No comment found!" });
    }

    const newReply = {
      repliedBy: repliedBy,
      repliedData: repliedData
    }
 
    findComment.reply.push(newReply)
    await findPost.save()
    return res.status(201).json({message: "Reply added to the commment !", findPost})
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error !!" });
  }
};


exports.createPost = createPost;
exports.retrievePost = retrievePost;
exports.likePost = likePost;
exports.sharePost = sharePost;
exports.commentOnPost = commentOnPost;
exports.addReplyOnComment = addReplyOnComment;