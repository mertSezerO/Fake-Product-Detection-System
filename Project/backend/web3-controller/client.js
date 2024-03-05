const { Web3 }  = require('web3');

const httpProvider = new Web3.providers.HttpProvider('http://localhost:7545');
const ganacheWeb3 = new Web3(httpProvider);

const addProduct = async () => {
    const accounts = await ganacheWeb3.eth.getAccounts();
    const contractAddress = "0x0d11cf6784dFEb5EE7978F912BC8e387c9997348"
    const contractAbi = [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "name": "owner",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        }
      ]

    const contract = new ganacheWeb3.eth.Contract(contractAbi, contractAddress)
    console.log(contract.methods);
    // contract.addProduct("Name","Status").call()
    // .then((result) => {
    //     console.log("Result: " + result);
    // }).catch((err) => {
    //     console.log("Error: "+ err);
    // });
}

addProduct();