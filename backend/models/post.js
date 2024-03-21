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

    likes: {
      type: Number,
      default: 0,
    },
    shares: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        commentedBy: {
          type: String,
        },
        commentedData: {
          type: String,
        },
        reply: [
          {
            repliedBy: {
              type: String,
            },
            repliedData: {
              type: String,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
