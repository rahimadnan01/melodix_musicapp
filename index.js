const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const mongoose = require("mongoose");
const Login = require("./models/login");
const User = require("./models/User");
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/melodix");
}

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
// Optional: Set the views directory (default is './views')
app.set("views", path.join(__dirname, "views"));

// Serve static files (e.g., CSS, JS, images)
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
//
app.get("/login/arigit", (req, res) => {
  res.render("arjit.html");
});

app.post("/signup", async (req, res) => {
  const newUser = new User(req.body.signup);
  await newUser.save();
  console.log(newUser);
  if (newUser.password !== newUser.confirmPassword) {
    res.send(
      "Password and confirm password are not same please make them same"
    );
  } else {
    res.redirect("/login");
  }
});

app.get("/login/signup", (req, res) => {
  res.render("signup.html");
});

app.post("/login", async (req, res) => {
  let { username, password } = req.body;
  try {
    const data = await User.find({ username });
    let dbUsername = await data[0].username;
    let dbPassword = await data[0].password;
    if (username == dbUsername && password == dbPassword) {
      res.render("welcome.html", { title: "Home Page" });
    } else {
      res.send("incorrect password");
    }
  } catch (err) {
    console.log(err);
  }
});

app.get("/login", (req, res) => {
  res.render("index.html", { title: "Melodix Login" });
});

app.get("/");
app.listen(port, () => {
  console.log(`app is running on port ${3000} `);
});
