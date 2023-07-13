const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      default: "",
      max: 500,
    },
    img: {
      public_id: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
