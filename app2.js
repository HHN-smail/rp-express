const express = require("express");
const app = express();

app.get("/app2", (req, res, next) => {
  res.send("app2 index");
});

app.get("/image", (req, res, next) => {
  res.send("app2 has images");
});

app.listen(3002);
