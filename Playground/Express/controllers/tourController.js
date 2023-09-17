const fs = require("node:fs");
const tours = JSON.parse(fs.readFileSync("./dev-data/tours.json"));

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
  if (tourID < tours.length) {
    res.status(200).json({
      status: "success",
      data: tours[tourID],
    });
  } else {
    res.status(404).json({
      status: "failure",
      message: `Tour with id: ${tourID} does not exist`,
    });
  }
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
