# ERC20 Token Contract

This repository contains a Solidity smart contract implementing an ERC20 token with additional features. The contract allows for token transfers, approvals, and includes a mechanism for rewarding miners. It also includes a comprehensive suite of tests written in JavaScript using Hardhat.

## Features

- Implements ERC20 token standard.
- Includes a reward mechanism that mints additional tokens to the miner after each transfer.
- Comprehensive tests to ensure contract functionality.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- Hardhat

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Lucas-Lantimant/erc20-token-contract.git
   cd erc20-token-contract
   ```
2. Install Dependencies

Ensure that your `package.json` includes the following dependencies:

- `@nomicfoundation/hardhat-toolbox`
- `chai`
- `ethers`
- `hardhat`
- `hardhat-gas-reporter`

To install these dependencies, run:

```bash
npm install
```
### Compile the Smart Contracts

Compile the smart contracts using:

```bash
npx hardhat compile
```
## Contract Details

### Solidity Code

The `TokenErc20` contract includes the following key functions:

- **`constructor()`**: 
  - Initializes the contract with a total supply of 10 tokens.
  - Sets a reward amount of 1000 tokens.

- **`totalSupply()`**: 
  - Public view function that returns the total supply of tokens.

- **`balanceOf(address tokenOwner)`**: 
  - Public view function that returns the balance of a specific address.

- **`transfer(address receiver, uint256 numTokens)`**: 
  - Transfers tokens from the caller to another address.
  - Mints rewards for the miner.

- **`approve(address delegate, uint256 numTokens)`**: 
  - Approves another address to spend a specified amount of tokens on behalf of the caller.

- **`allowance(address owner, address delegate)`**: 
  - Public view function that returns the remaining number of tokens that a spender is allowed to spend on behalf of the owner.

- **`transferFrom(address owner, address buyer, uint256 numTokens)`**: 
  - Transfers tokens from one address to another.
  - Considers allowances and mints rewards for the miner.

### Ignition Deployment

The contract can be deployed using Hardhat Ignition. An example deployment script is included in the repository.

### OpenZeppelin

To simplify the implementation, you can use OpenZeppelin's ERC20 implementation. Replace the custom implementation with OpenZeppelin’s ERC20 contract for a more standardized and tested solution.

## License

This project is licensed under the `MIT License` - see the LICENSE file for details.