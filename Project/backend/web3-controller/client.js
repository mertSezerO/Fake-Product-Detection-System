const { Web3 }  = require('web3');
const express = require('express');
const app = express();

const cors = require('cors');
const CORS = cors({
  origin:"*"
})

require('dotenv').config();

app.use(CORS);
app.use(express.json());

//Utils includes providers, web3 object and contract objects
const utils = require('./utils');

const productRouter = require('./routes/product');
const supplyChainRouter = require('./routes/supply-chain');

app.use(productRouter);
app.use(supplyChainRouter);

app.listen(process.env.PORT, () => {
  console.log("Listening on port: "+ process.env.PORT);
})