const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();

app.use(bodyParser.json());

const SLACK_WEBHOOK_URL =
  "https://hooks.slack.com/services/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";

app.post("/webhook", async (req, res) => {
  let record = req.body.record;
  console.log("📦 Record Data:", JSON.stringify(record, null, 2));

  const status = record.Status.value || "N/A";
  const taskName = record.task.value || "N/A";
  const textMessage = record.message.value || "N/A";
  const userName = record.Created_by.value.name || "Unknown User";
  const time = record.time.value || "Unknown Time";

  if (status === "Completed") {
    console.log("👤 User Name:", userName);
    console.log("🕒 Time:", time);
    console.log("🕒 Time:", textMessage);
    console.log("🕒 Time:", taskName);
    console.log(" Sending to Slack...");
    await axios.post(SLACK_WEBHOOK_URL, {
      text: `✅ *Task Completed*\n• 📌 Task:\n *${taskName}*\n• 📨 Message:\n ${textMessage}\n• 👤 By:\n ${userName}\n• 🕒 Time:\n ${time}`,
    });
  } else {
    console.log(" Status is not 'complete':", status);
  }

  res.sendStatus(200);
});

// Run on port 3000 (no HTTPS needed)
app.listen(3000, () => {
  console.log("🚀 Server is running on http://localhost:3000");
});
