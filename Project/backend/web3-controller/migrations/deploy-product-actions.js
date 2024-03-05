const productContract = artifacts.require("ProductAction");

module.exports = function(deployer) {
  deployer.deploy(productContract);
};
