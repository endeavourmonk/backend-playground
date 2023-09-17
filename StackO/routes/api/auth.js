const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("../../setup/myUrl");

// @type    GET
// @route   /api/auth
// @desc    just for testing auth
// @access  PUBLIC
router.get("/", (req, res) => {
  res.json({
    test: "Auth is success",
  });
});

// Import Schema for Person to Register
const Person = require("../../models/Person");

// @type    POST
// @route   /api/auth/register
// @desc    route for user registration
// @access  PUBLIC
router.post("/register", (req, res) => {
  Person.findOne({ email: req.body.email })
    .then((person) => {
      if (person) {
        res.status(400).json({ emailError: "Email is already Registered" });
      } else {
        const newPerson = new Person({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });

        // Encrypting password using bcryps
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(newPerson.password, salt, (err, hash) => {
            // Store hash in your password DB.
            if (err) throw err;
            newPerson.password = hash;
            newPerson
              .save()
              .then((person) => res.json(person))
              .catch((err) => console.log(err));
          });
        });
      }
    })
    .catch((err) => console.log(err));
});

// @type    POST
// @route   /api/auth/login
// @desc    route for user login
// @access  PUBLIC
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  Person.findOne({ email })
    .then((person) => {
      if (!person) {
        return res
          .status(404)
          .json({ emailError: "Email not registered with us" });
      }
      bcrypt
        .compare(password, person.password)
        .then((isCorrect) => {
          if (isCorrect) {
            // res.json({ success: "Logged In Successfully" });
            // use a payload and create token for user
            const payload = {
              id: person.id,
              name: person.name,
              email: person.email,
            };

            jwt.sign(
              payload,
              key.secret,
              { expiresIn: 60 * 60 },
              (err, token) => {
                res.json({
                  success: true,
                  token: `Bearer ${token}` 
                })
              }
            );
    
          } else {
            res.status(400).json({ passwordErr: "Wrong Password" });
          }
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

module.exports = router;
