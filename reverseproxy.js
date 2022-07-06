const express = require("express");
const https = require("https");
const http = require("http");
const fs = require("fs");
const axios = require("axios");
const app = express();

const app1 = require("./app1");
const app2 = require("./app2");

// We are doing TLS termination as all apps are running on the same maching
// open ssl certs
app.get(["/app1", "/style"], async (req, res) => {
  let backend_response = await axios
    .get("http://localhost:3001" + req.path, {
      headers: {
        host: req.headers["host"],
        ip: req.headers["x-forwarded-for"] || "127.0.0.1",
      },
    })
    .catch((e) => console.log(e));
  res.send(backend_response.data);
});

app.get(["/app2", "/image"], async (req, res) => {
  let backend_response = await axios
    .get("http://localhost:3002" + req.path, {
      headers: {
        host: req.headers["host"],
        ip: req.headers["x-forwarded-for"] || "127.0.0.1",
      },
    })
    .catch((e) => console.log(e));
  res.send(backend_response.data);
});

const options = {
  key: fs.readFileSync("./config/private.key"),
  cert: fs.readFileSync("./config/certificate.pem"),
};

const https_server = https.createServer(options, app);
const http_server = http.createServer((req, res) => {
  res.writeHead(301, { Location: "https://localhost" + req.path });
  //   I don't want to serve HTTP
  res.end();
});

https_server.listen(443, () => console.log("server listening"));
http_server.listen(80, () => console.log("http server listening"));
// not using environment variables or multiple files to maintain simplicity
