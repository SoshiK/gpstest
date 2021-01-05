const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
app.use(cors())

const PORT = process.env.PORT || 8000;

app.get("/api/hello", (req, res) => {
  res.send({hello:"hello world"});
})

app.get("/api/distance", (req, res) => {
  console.log(req.query);
  const lat1 = Number(req.query.lat);
  const lng1 = Number(req.query.lng);
  const lat2 = 35.65798080;
  const lng2 = 139.7277585;
  const lat1PI = lat1 * Math.PI / 180;
  const lng1PI = lng1 * Math.PI / 180;
  const lat2PI = lat2 * Math.PI / 180;
  const lng2PI = lng2 * Math.PI / 180;
  const dis = 6371 * Math.acos(Math.cos(lat1PI) * Math.cos(lat2PI) * Math.cos(lng2PI - lng1PI) + Math.sin(lat1PI) * Math.sin(lat2PI));
  res.send({dis: dis});
})

app.get("*", (req, res) => {
  console.log(path.resolve(__dirname, "..", "build", "index.html"));
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

app.listen(PORT,() => {
  console.log(`The server has started on ${PORT}`);
})