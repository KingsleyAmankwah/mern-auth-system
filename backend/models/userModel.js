const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    photo: {
      type: String,
      // required: [true, "Please add a photo"],
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
    phone: {
      type: String,
      default: "Phone Number",
    },
    bio: {
      type: String,
      default: "Tell us about yourself",
    },
    token: {
      type: String,
      default: "",
    },
    reset_token: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["subscriber", "admin"],
      default: "subscriber",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
