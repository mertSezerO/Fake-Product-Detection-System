const { Web3 }  = require('web3');
const express = require('express');
const app = express();
const cors = require('cors');
const CORS = cors({
  origin:"*"
})

app.use(CORS);
app.use(express.json());

//Utils includes providers, web3 object and contract objects
const utils = require('./utils');

const productRouter = require('./routes/product');
const supplyChainRouter = require('./routes/supply-chain');

app.use(productRouter);
app.use(supplyChainRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Listening on port: "+ PORT);
})