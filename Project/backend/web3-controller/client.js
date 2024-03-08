const { Web3 }  = require('web3');
const express = require('express');
const app = express()

//Utils includes providers, web3 object and contract objects
const utils = require('./utils');

// contract.events.ProductAddition((error, event) => {
//   if (error) {
//       console.error('Error:', error);
//   } else {
//       console.log('Event:', event.event); // Event name
//       console.log('Data:', event.returnValues); // Event data
//   }
// })
// .on("data", (event) => {
//   console.log("IT WORKED", event.returnValues);
// })

// const addProduct = async () => {
//   await contract.methods.addProduct("product", "status").send({ from: "0xf0f06BDfA5645E71e50BFde291F1D5551A0bAc07" });
// }

// addProduct()
// app.listen(8000, () => {
//   console.log("Listening...");
// })