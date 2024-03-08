const { Web3 }  = require('web3');
const express = require('express');
const app = express()

//Utils includes providers, web3 object and contract objects
const utils = require('./utils');

app.listen(8000, () => {
  console.log("Listening...");
})