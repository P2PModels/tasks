/* global artifacts */
var Tasks = artifacts.require('Tasks.sol')

module.exports = function(deployer) {
  deployer.deploy(Tasks)
}
