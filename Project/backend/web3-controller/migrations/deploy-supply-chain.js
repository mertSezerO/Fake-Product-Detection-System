const supplyChainContract = artifacts.require("SupplyChain");

module.exports = function(deployer) {
  deployer.deploy(supplyChainContract);
};
