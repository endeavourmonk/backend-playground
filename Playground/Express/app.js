const express = require("express");
const fs = require("node:fs");
const morgan = require("morgan");
const tourRouter = require("./routes/tours");

const PORT = 3000;
const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));

app.use((req, res, next) => {
  console.log("hello from middleware");
  res.requestTime = new Date().toLocaleString();
  next();
});

app.use("/api/v1/tours", tourRouter);

app.listen(PORT, () => {
  console.log(`App running on PORT: ${PORT}`);
});
