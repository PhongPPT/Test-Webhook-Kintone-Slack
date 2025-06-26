const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const fs = require("fs");
const https = require("https");
app.use(bodyParser.json());

const SLACK_WEBHOOK_URL =
  "https://hooks.slack.com/services/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";

app.post("/webhook", async (req, res) => {
  console.log("req", req);
  const record = req.body.record;

  console.log("record", record);

  const status = record.status?.value;
  const taskName = record.task?.value;
  const textMessage = record.message?.value;

  if (status === "complete") {
    await axios.post(SLACK_WEBHOOK_URL, {
      text: ` Task Completed: *${taskName}*`,
      message: ` Text: *${textMessage}*`,
    });
  } else {
    console.log("Status is not 'complete':", status);
  }
  res.sendStatus(200);
});

var options = {
  key: fs.readFileSync(
    "C:\\Users\\PC0001\\Downloads\\webhookkintone\\server.key"
  ),
  cert: fs.readFileSync(
    "C:\\Users\\PC0001\\Downloads\\webhookkintone\\server.crt"
  ),
};

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

https.createServer(options, app).listen(3000, () => {
  console.log("Server is running on port 3000");
});
