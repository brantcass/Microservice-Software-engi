const express = require("express");
const app = express();
const PORT = 3010;
let timerId;

app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/start", (req, res) => {
  timerId = setInterval(() => {
    //console.log("Workout!");
  }, 2000); // 2 seconds interval for workout time

  res.json({ message: "Timer started for workout." });
});

app.get("/stop", (req, res) => {
  clearInterval(timerId);
  res.json({ message: "Timer stopped." });
});

app.listen(PORT, () => {
  console.log(`Receiver microservice listening on port ${PORT}`);
});
