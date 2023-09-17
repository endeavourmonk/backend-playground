const express = require("express");
const fs = require("node:fs");
const morgan = require("morgan");

const tours = JSON.parse(fs.readFileSync("./dev-data/tours.json"));
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(morgan("dev"));

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

const getTour = (req, res) => {
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

const createTour = (req, res) => {
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

app.use((req, res, next) => {
  console.log("hello from middleware");
  res.requestTime = new Date().toLocaleString();
  next();
});

const tourRouter = express.Router();
app.use("/api/v1/tours", tourRouter);

tourRouter.route("/").get(getAllTours).post(createTour);
tourRouter.route("/:id").get(getTour);

app.listen(PORT, () => {
  console.log(`App running on PORT: ${PORT}`);
});
