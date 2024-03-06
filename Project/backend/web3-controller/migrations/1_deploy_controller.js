const controllerContract = artifacts.require("Controller");

module.exports = function(deployer) {
  deployer.deploy(controllerContract);
};
