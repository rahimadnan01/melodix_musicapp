let mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
  username: {
    type: String,
    maxLength: 20,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  confirmPassword: {
    type: String,
    required: true,
    minLength: 8,
  },
});

let User = new mongoose.model("User", userSchema);
module.exports = User;
