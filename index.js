const express = require("express");
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Hospital App

let hospitalDatabase = [
  {
    patientName: "Some One",
    kidneys: ["healthy", "healthy"],
  },
  {
    patientName: "Some One New",
    kidneys: ["healthy", "unhealthy"],
  },
];

app.get("/", (req, res) => {
  res.send("GOT THE HOSPITAL DATABASE");
});

app.get("/database", (req, res) => {
  res.status(200).json(hospitalDatabase);
});

app.post("/database", (req, res) => {
  // add a new patient to the record
  let addData = req.body;
  hospitalDatabase.push(addData);
  res.status(200).json(addData);
});

app.put("/database/:id", (req, res) => {
  // put
  let myId = parseInt(req.params.id);
  console.log(myId);
  if (myId >= 0 && myId < hospitalDatabase.length) {
    hospitalDatabase[myId].kidneys[0] = "healthy";
    hospitalDatabase[myId].kidneys[1] = "unhealthy";
    res.status(200).json(hospitalDatabase);
  } else {
    res.status(404).json({ err: "Data not found" });
  }
});

app.delete("/database/:id", (req, res) => {
  // delete
  let myId = parseInt(req.params.id);
  hospitalDatabase.slice(myId, 1);
  res.status(200).json(hospitalDatabase);
});

app.listen(port, function () {
  console.log(`Listening on ${port}`);
});
