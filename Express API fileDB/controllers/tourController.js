const fs = require("node:fs");
const tours = JSON.parse(fs.readFileSync("./dev-data/tours.json"));

// middleware
exports.checkBody = (req, res, next) => {
  const data = req.body;
  if (data.name && data.price && data.description && data.startDates) {
    next();
  } else {
    res.status(400).json({
      message: "Missig Details (name, price, description, start dates)",
    });
  }
};

exports.checkId = (req, res, next, id) => {
  if (id >= tours.length) {
    return res.status(404).json({
      status: "failure",
      message: `Tour with id: ${id} does not exist`,
    });
  }
  next();
};

// Route Handlers
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

exports.getTour = (req, res) => {
  const tourID = req.params.id;
  res.status(200).json({
    status: "success",
    data: tours[tourID],
  });
};

exports.createTour = (req, res) => {
  const id = tours.length;
  const newTour = { id: id, ...req.body };
  tours.push(newTour);
  fs.writeFile("./dev-data/tours.json", JSON.stringify(tours), (err) => {
    if (!err) {
      res.status(201).json({
        status: "success",
        data: {
          newTour,
        },
      });
    } else {
      res.status(400).json("err");
    }
  });
};
