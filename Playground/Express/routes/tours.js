const express = require("express");
const fs = require("node:fs");
const {
  getAllTours,
  getTour,
  createTour,
} = require("./../controllers/tourController");

const tourRouter = express.Router();

tourRouter.route("/").get(getAllTours).post(createTour);
tourRouter.route("/:id").get(getTour);

module.exports = tourRouter;
