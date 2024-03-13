const Types = artifacts.require("Types");

const productContract = artifacts.require("ProductAction");
const supplyContract = artifacts.require("SupplyChain");

module.exports = async function (deployer) {
  // Deploy the library contract
  await deployer.deploy(Types);
  await deployer.deploy(productContract);
  await deployer.deploy(supplyContract);
};

