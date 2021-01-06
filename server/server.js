const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(cors())

const PORT = process.env.PORT || 8000;

app.get("/api/hello", (req, res) => {
  res.send({hello:"hello world"});
})

const calcDistance = (lat1, lng1, lat2, lng2) => {
  const lat1PI = lat1 * Math.PI / 180;
  const lng1PI = lng1 * Math.PI / 180;
  const lat2PI = lat2 * Math.PI / 180;
  const lng2PI = lng2 * Math.PI / 180;
  const dis = 6371 * Math.acos(Math.cos(lat1PI) * Math.cos(lat2PI) * Math.cos(lng2PI - lng1PI) + Math.sin(lat1PI) * Math.sin(lat2PI));
  return dis;
}

app.get("/api/distance", (req, res) => {
  const lat1 = Number(req.query.lat);
  const lng1 = Number(req.query.lng);
  const lat2 = 35.65798080;
  const lng2 = 139.7277585;
  const dis = calcDistance(lat1, lng1, lat2, lng2);
  res.send({dis: dis});
})

app.get("/api/nearby", (req, res) => {
  const lat1 = Number(req.query.lat);
  const lng1 = Number(req.query.lng);
  const dataArr = require("../data/data.json");
  for (const data of dataArr) {
    const dis = calcDistance(lat1, lng1, data.lat, data.lng);
    data.dis = dis;
  }
  dataArr.sort((x,y) => x.dis - y.dis);
  res.send(dataArr);
})

app.use(express.static(path.join(__dirname, "..","build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

app.listen(PORT,() => {
  console.log(`The server has started on ${PORT}`);
})