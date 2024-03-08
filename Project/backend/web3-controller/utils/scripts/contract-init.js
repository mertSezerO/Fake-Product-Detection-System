const { Web3 }  = require('web3');

const contractData = require('./address-parser');

const wsProvider = new Web3.providers.WebsocketProvider('ws://localhost:7545');
const ganacheWeb3 = new Web3(wsProvider);
const contracts = [];
console.log(Object.keys(contractData));

Object.keys(contractData).forEach(contract => {
    contracts.push(new ganacheWeb3.eth.Contract(contractData[contract].abi, contractData[contract].address));
})

module.exports = {
    wsProvider,
    ganacheWeb3,
    contracts
}