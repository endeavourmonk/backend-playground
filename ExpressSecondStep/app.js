const express = require("express");
const app = express();
const port = 3000;

var logToConsole = function (req, res, next) {
  console.log("I AM MIDDLEWARE");
  next();
};

var reqTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

app.use(logToConsole);
app.use(reqTime);

app.get("/", (req, res) => {
  console.log("Hello World " + req.requestTime);
  res.send("Hello World " + req.requestTime);
});

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
