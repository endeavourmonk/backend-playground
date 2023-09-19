const express = require("express");
const {
  getAllTours,
  getTour,
  createTour,
  checkId,
  checkBody,
} = require("./../controllers/tourController");

const router = express.Router();

// param middleware
router.param("id", checkId);

router.route("/").get(getAllTours).post(checkBody, createTour);
router.route("/:id").get(getTour);

module.exports = router;
