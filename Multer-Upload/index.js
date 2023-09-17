const express = require("express");
const ejs = require("ejs");
const multer = require("multer");
const path = require("path");

const app = express();
const port = process.env.port || 3000;

// multer setting
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/myuploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
}).single("porfilepic");

// set for ejs
app.set("view engine", "ejs");

// static folder
app.use(express.static("./public"));

// Description

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/upload", (req, res) => {
  upload(req, res, (error) => {
    if (error) {
      res.render("index", {
        message: error,
      });
    } else {
      res.render("index", {
        message: "successfully uploaded...",
        filename: `myuploads/${req.file.filename}`,
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}...`);
});
