const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/about", (req, res) => {
  response.send("About");
});

app.post("/login", (request, response) => {
  response.status(200).json({ id: "endeavourmonk", message: "logged in" });
});

app.delete("/delete", (req, res) => {
  res.send("successfully deleted");
});

app.get("/users/:id/status/:status_id", (req, res) => {
  res.send(req.params);
});

app.get("/flights/:from-:to", (req, res) => {
  res.send(req.params);
});

app.listen(port, () =>
  console.log(`server running at http://localhost:${port}`)
);
