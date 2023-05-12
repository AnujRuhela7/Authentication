//jshint esversion:6
require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 12;

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
// const secret = process.env.SECRET_KEY;
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
  bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    const newUser = new User({
      email: req.body.username,
      password: hash,
    });
    await newUser.save();
    res.render("secrets");
  });
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({ email: username });

  if (user) {
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        res.render("secrets");
      } else {
        res.render("login");
      }
    });
  } else {
    res.render("login");
  }
});

app.listen(3000, () => {
  console.log("Server is up and running at port 3000");
});
