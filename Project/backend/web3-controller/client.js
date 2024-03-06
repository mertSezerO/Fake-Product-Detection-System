const { Web3 }  = require('web3');
const express = require('express');
const app = express()

const fs = require('fs')
const path = require('path');

const wsProvider = new Web3.providers.WebsocketProvider('ws://localhost:7545');
const ganacheWeb3 = new Web3(wsProvider);

const contractAddress = "0x4B6955a6A674Da2Dc172BB89AD312Ec8b2EEF263"

const controllerPath = path.resolve(__dirname, "build", "contracts", "Controller.json")
const controllerFile = fs.readFileSync(controllerPath)
const contractAbi = JSON.parse(controllerFile).abi

const contract = new ganacheWeb3.eth.Contract(contractAbi, contractAddress)

contract.events.ProductAddition((error, event) => {
  if (error) {
      console.error('Error:', error);
  } else {
      console.log('Event:', event.event); // Event name
      console.log('Data:', event.returnValues); // Event data
  }
})
.on("data", (event) => {
  console.log("IT WORKED", event.returnValues);
})

const addProduct = async () => {
  await contract.methods.addProduct("product", "status").send({ from: "0xf0f06BDfA5645E71e50BFde291F1D5551A0bAc07" });
}

addProduct()
app.listen(8000, () => {
  console.log("Listening...");
})