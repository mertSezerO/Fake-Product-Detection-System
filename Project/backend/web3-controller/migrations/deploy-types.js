const typesContract = artifacts.require("Types");

module.exports = function(deployer) {
  deployer.deploy(typesContract);
};
