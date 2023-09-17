const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    test: "Questions is success",
  });
});

module.exports = router;
