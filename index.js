// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();
const moment = require("moment");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date", function (req, res) {
  // const temp = "2025-06-05T08:30:00Z";
  // const timestamp = Date.parse(temp);
  // console.log(timestamp);

  const d = req.params.date;
  const date = Date.parse(d);
  if (date === NaN) {
    return res.status(400).json({
      error: "Invalid Date",
    });
  }
  const dd = new Date(d);
  return res.status(200).json({
    utc: dd.toUTCString(),
    unix: date,
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
