let mongoose = require("mongoose");
let loginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
    minLength: 8,
  },
});

let Login = new mongoose.model("Login", loginSchema);
module.exports = Login;
