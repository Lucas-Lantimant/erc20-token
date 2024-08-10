require("@nomicfoundation/hardhat-toolbox");
require("hardhat-gas-reporter");

module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      chainId: 1337
    }
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
    gasPrice: 20
  }
};