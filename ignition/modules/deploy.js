const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TokenModule", (m) => {
  const initialSupply = m.getParameter("initialSupply", 10 * 10**18); // Ajuste conforme necessário
  const rewardAmount = m.getParameter("rewardAmount", 1000 * 10**18); // Ajuste conforme necessário

  const token = m.contract("TokenErc20", [], {
    from: m.deployerAddress,
  });

  return { token };
});