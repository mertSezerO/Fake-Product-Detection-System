const { Web3 }  = require('web3');
const contracts = require('./compile');

const httpProvider = new Web3.providers.HttpProvider('http://localhost:7545')
const ganacheWeb3 = new Web3(httpProvider)

//wallet connection
const deploy = async () => {
    const accounts = await ganacheWeb3.eth.getAccounts();
  
    console.log('Attempting to deploy from account', accounts[0]);
  
    const result = await new ganacheWeb3.eth.Contract(contracts.ControllerABI, contracts.ControllerBytecode)
      .deploy({ data: bytecode })
      .send({ gas: '1000', from: accounts[0] });
  
    console.log('Contract deployed to', result.options.address);
    httpProvider.engine.stop();
  };
  deploy();
