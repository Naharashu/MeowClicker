const express = require("express");
const path = require("path");
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.sendFile(path.join("..", 'index.html'));
});

app.use(express.static("."));

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});