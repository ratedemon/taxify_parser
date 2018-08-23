const puppeteer = require('./puppeteer');
const express = require('express');
const app = express();
const config = require('./config');
const bodyParser = require("body-parser");

const jsonParser = bodyParser.json();

app.post('/', jsonParser, async (req, res) => {
  if(!req.body) return res.sendStatus(400);
  
  return res.json({
    link: await puppeteer(req.body)
  });
});

app.listen(config.port, function () {
  console.log(`Server listening on port ${config.port}...`);
});

module.exports = app;