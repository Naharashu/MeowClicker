const express = require("express");
const path = require("path");
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.use(express.static("."));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});