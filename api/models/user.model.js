const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
      index: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    profile: {
      type: String,
      required: true,
    },
    hashed_password: {
      type: String,
      required: true,
      select: false,
    },
    salt: { type: String, select: false },
    about: {
      type: String,
    },
    role: {
      type: Number,
      trim: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
    resetPasswordLink: {
      data: String,
      default: "",
    },
  },
  { timestamps: true }
);
userSchema.set("toJSON", {
  virtuals: true,
});
userSchema.methods = {
  authenticate: function (password) {
    return this.encryptPassword(password) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha512", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random());
  },
};

userSchema
  .virtual("password")
  // Note: Can't use arrow function in here cause arrow function not bind this
  .set(function (setPassword) {
    // declare a new variable call setPassword (Does not have the same name as the virtual field)
    // if set same name, return error: RangeError: Maximum call stack size exceeded
    this.setPassword = setPassword;
    // Gen salt
    this.salt = this.makeSalt();
    // encryptPassword
    this.hashed_password = this.encryptPassword(setPassword);
  })
  .get(() => {
    return this.setPassword;
  });

module.exports = mongoose.model("users", userSchema);
