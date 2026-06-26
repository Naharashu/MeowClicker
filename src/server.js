const express = require("express");
const path = require("path");
const app = express();
const port = 8080;

app.use(express.static("."));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/shop', (req, res) => {
  res.sendFile(path.join(__dirname, 'shop.html'));
});

app.get('/settings', (req, res) => {
  res.sendFile(path.join(__dirname, 'settings.html'));
});

app.get('/thank_to', (req, res) => {
  res.sendFile(path.join(__dirname, 'thanks_to.html'));
});


app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});