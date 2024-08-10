const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TokenErc20", function () {
  let TokenErc20, token, owner, addr1, addr2;

  beforeEach(async function () {
    TokenErc20 = await ethers.getContractFactory("TokenErc20");
    [owner, addr1, addr2] = await ethers.getSigners();
    token = await TokenErc20.deploy();
    await token.deployed();
  });

  it("Should have the correct name and symbol", async function () {
    expect(await token.name()).to.equal("Token");
    expect(await token.symbol()).to.equal("Tkn");
  });

  it("Should mint initial supply to the deployer", async function () {
    const deployerBalance = await token.balanceOf(owner.address);
    const totalSupply = await token.totalSupply();
    expect(deployerBalance).to.equal(totalSupply);
  });

  it("Should transfer tokens between accounts", async function () {
    await token.transfer(addr1.address, 1000);
    const addr1Balance = await token.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(1000);

    // Check gas usage for transfer
    const tx = await token.transfer(addr2.address, 500);
    const receipt = await tx.wait();
    console.log("Gas used for transfer:", receipt.gasUsed.toString());
    
    const addr2Balance = await token.balanceOf(addr2.address);
    expect(addr2Balance).to.equal(500);
  });

  it("Should handle allowance and transferFrom correctly", async function () {
    await token.approve(addr1.address, 1000);
    const allowance = await token.allowance(owner.address, addr1.address);
    expect(allowance).to.equal(1000);

    await token.connect(addr1).transferFrom(owner.address, addr2.address, 500);
    const addr2Balance = await token.balanceOf(addr2.address);
    expect(addr2Balance).to.equal(500);

    // Check gas usage for transferFrom
    const tx = await token.connect(addr1).transferFrom(owner.address, addr2.address, 500);
    const receipt = await tx.wait();
    console.log("Gas used for transferFrom:", receipt.gasUsed.toString());
  });

  it("Should mint reward to miner on transfer", async function () {
    const initialMinerBalance = await token.balanceOf(owner.address);
    await token.transfer(addr1.address, 1000);
    const finalMinerBalance = await token.balanceOf(owner.address);
    const rewardAmount = 1000 * 10**18; // Adjust according to your rewardAmount logic

    expect(finalMinerBalance).to.equal(initialMinerBalance + rewardAmount);
  });
});