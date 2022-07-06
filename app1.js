const express = require("express");
const app = express();

app.get("/app1", (req, res, next) => {
  res.send("app1 index");
});

app.get("/style", (req, res, next) => {
  res.send("app1 has styles");
});

app.listen(3001);
