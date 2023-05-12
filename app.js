//jshint esversion:6
require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const md5 = require("md5");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose
  .connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => console.log(err));

// User Modal
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const secret = process.env.SECRET_KEY;
const User = new mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const newUser = new User({
    email: req.body.username,
    password: md5(req.body.password),
  });
  await newUser.save();
  res.render("secrets");
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = md5(req.body.password);

  const user = await User.findOne({ email: username });

  if (user) {
    if (user.password === password) {
      res.render("secrets");
    } else {
      console.log("Wrong Password");
      res.render("login");
    }
  } else {
    console.log("User Not Found");
    res.render("login");
  }
});

app.listen(3000, () => {
  console.log("Server is up and running at port 3000");
});
