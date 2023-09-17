const cookieParser = require("cookie-parser");
const express = require("express");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;

passport.use(
  new FacebookStrategy(
    {
      clientID: "your_client_id",
      clientSecret: "your_client_secret",
      callbackURL: "http://localhost:3000/login/facebook/return",
    },
    function (accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

const port = 3000;
const app = express();

// set view dir
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(require("morgan")("combined"));
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "lco app",
    resave: true,
    saveUnitialized: true,
  })
);

// @route   - GET /home
// @desc    - a route to home page
// @access  - PUBLIC

app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

// @route   - GET /login
// @desc    - a route to login
// @access  - PUBLIC

app.get("/login", (req, res) => {
  res.render("login");
});

// @route   - GET /login/facebook
// @desc    - a route to facebook auth
// @access  - PUBLIC

app.get("/login/facebook", passport.authenticate("facebook"));

// @route   - GET /login/facebook/callback
// @desc    - a route to facebook auth
// @access  - PUBLIC

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

// @route   - GET /profile
// @desc    - a route to profile of user
// @access  - PRIVATE

app.get(
  "/profile",
  require("connect-ensure-login").ensureLoggedIn(),
  (req, res) => {
    res.render("profile", { user: req.user });
  }
);

app.listen(port, () => {
  console.log(`server is running at http://localhost::${port}`);
});
