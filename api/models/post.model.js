const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: { type: String, trim: true, required: true },
    description: String,
    body: String,
    favoritesCount: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, toJSON: true }
);

module.exports = mongoose.model("posts", postSchema);
