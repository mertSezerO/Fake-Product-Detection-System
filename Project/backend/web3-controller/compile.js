const path = require("path");
const fs = require("fs");
const solc = require("solc");

const controllerPath = path.resolve(__dirname, "contracts", "Controller.sol");
const productPath = path.resolve(__dirname, "contracts", "ProductAction.sol");
const supplyChainPath = path.resolve(__dirname, "contracts", "SupplyChain.sol");
const typesPath = path.resolve(__dirname, "contracts", "Types.sol");

const csource = fs.readFileSync(controllerPath, "utf8");
const psource = fs.readFileSync(productPath, "utf8");
const ssource = fs.readFileSync(supplyChainPath, "utf8");
const tsource = fs.readFileSync(typesPath, "utf8");

var input = {
    language: 'Solidity',
    sources: {
      'Controller.sol': {
        content: csource
      },
      'ProductAction.sol':{
        content: psource
      },
      'SupplyChain.sol':{
        content: ssource
      },
      'Types.sol':{
        content: tsource
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  };

const output = JSON.parse(solc.compile(JSON.stringify(input)))
console.log(output.contracts['Controller.sol']['Controller'].abi);
module.exports = {
    ControllerABI: output.contracts['Controller.sol']['Controller'].abi,
    ControllerBytecode: output.contracts['Controller.sol']['Controller'].evm.bytecode.object,
    ProductActionABI: output.contracts['ProductAction.sol']['ProductAction'].abi,
    ProductActionBytecode: output.contracts['ProductAction.sol']['ProductAction'].evm.bytecode.object,
    SupplyChainABI: output.contracts['SupplyChain.sol']['SupplyChain'].abi,
    SupplyChainBytecode: output.contracts['SupplyChain.sol']['SupplyChain'].evm.bytecode.object,
};