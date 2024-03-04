const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    postBy: {
      type: String,
    },
    postName: {
      type: String,
    },
    about: {
      type: String,
    },
    image: {
      name: {
        type: String,
      },
      path: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
