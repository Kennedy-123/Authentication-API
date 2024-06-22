const mongoose = require('mongoose');

// user schema

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true, // automatically removes whitespaces
    },

    password: {
      type: String,
      required: true,
    },
  }, { timestamps: true }
);

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
