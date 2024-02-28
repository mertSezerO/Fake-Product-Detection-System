// const { Web3 }  = require('web3');
// const contracts = require('../compile');

// const httpProvider = new Web3.providers.HttpProvider('http://localhost:7545')
// const ganacheWeb3 = new Web3(httpProvider)

// //wallet connection
// const deploy = async () => {

//     const accounts = await ganacheWeb3.eth.getAccounts();
    
//     const result = await new ganacheWeb3.eth.Contract(contracts.ControllerABI, accounts[0])
//       .deploy({ data: contracts.ControllerBytecode })
// };
//   deploy();

const controllerContract = artifacts.require("Controller");
// const MyContract = artifacts.require("Controller");
// const MyContract = artifacts.require("Controller");
// const MyContract = artifacts.require("Controller");

module.exports = function(deployer) {
  deployer.deploy(controllerContract);
};
