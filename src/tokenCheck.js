const express = require("express");
const bodyParser = require("body-parser");
const { exec } = require("child_process");

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.post("/tokenCheck", (req, res) => {
  const { token } = req.body;
  console.log(`Received token: ${token}`);
  if (!token) {
    res.status(400).send({ valid: false, error: "Token is required" });
    return;
  }
  exec(`python token_check.py ${token}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.status(500).send({ valid: false, error: stderr });
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    try {
      const result = JSON.parse(stdout);
      res.send(result);
    } catch (e) {
      console.error(`JSON parse error: ${e}`);
      res.status(500).send({ valid: false });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


