const puppeteer = require('./puppeteer');
const express = require('express');
const app = express();
const config = require('./config');
const bodyParser = require("body-parser");
const morgan = require('morgan');

const jsonParser = bodyParser.json();

app.use(morgan('tiny'));

app.post('/', jsonParser, async (req, res) => {
  try{
    if(!req.body) return res.sendStatus(400);
  
    const link = await puppeteer(req.body)
  
    return res.json({link});
  } catch (e){
    return res.status(400).send({
      error: e.message
    });
  }
});

app.listen(config.port, function () {
  console.log(`Server listening on port ${config.port}...`);
});

module.exports = app;