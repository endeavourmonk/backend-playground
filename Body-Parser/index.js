const express = require("express");
const bodyParser = require("body-parser");

let app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/login", express.static(__dirname + "/public"));

// The first line of code is using the body-parser middleware to parse incoming request bodies in a
// URL-encoded format. The urlencoded method of body-parser middleware is used to parse the request body
// of form data. It is setting the option extended to false, which means that it will only parse strings
// and arrays and will not allow nested objects in the request body.
// The second line of code is serving static files located in the public directory when a request is made
// to the /login route. The express.static middleware is used to serve static files such as images, CSS,
// and JavaScript files. The __dirname variable refers to the current directory name where the
// application is located. Overall, these two lines of code are configuring middleware functions that will
// handle incoming requests and serve static files for the /login route.

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/login", (req, res) => {
  console.log(req.body);
  // do some database processing
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
