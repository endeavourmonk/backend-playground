const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

// bring all routes
const auth = require("./routes/api/auth");
const profile = require("./routes/api/profile");
const questions = require("./routes/api/questions");

const app = express();

// Middleware for bodyparser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// mongodb config
const db = require("./setup/myUrl").mongoUrl;

// Attempt to connect to database
mongoose
  .connect(db)
  .then(() => console.log("mongodb connected successfully"))
  .catch(() => console.log("failed connecting to mongodb, ERROR:" + err));

// route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// actual routes
app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/questions", questions);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`app is running at ${port}`));
