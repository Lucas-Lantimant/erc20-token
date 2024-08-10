// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface Token {
    function totalSupply() external view returns(uint256);
    function balanceOf(address account) external view returns(uint256);
    function allowance(address owner, address spender) external view returns(uint256);
    
    function transfer(address recipient, uint256 amount) external returns(bool);
    function approve(address spender, uint256 amount) external returns(bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns(bool);
    
    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Approval(address indexed owner, address indexed spender, uint256 amount);
}

contract TokenErc20 is Token {
    string public constant name = "Token";
    string public constant symbol = "Tkn";
    uint8 public constant decimals = 18;
    mapping(address => uint256) balances;
    mapping(address => mapping(address => uint256)) allowed;
    uint256 private totalSupply_;
    uint256 private rewardAmount;

    constructor() {
        totalSupply_ = 10 * 10**uint256(decimals); 
        rewardAmount = 1000 * 10**uint256(decimals); 
        balances[msg.sender] = totalSupply_;
    }
    
    function totalSupply() public view override returns(uint256) {
        return totalSupply_;
    }

    function balanceOf(address tokenOwner) public view override returns(uint256) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint256 numTokens) public override returns(bool) {
        require(numTokens <= balances[msg.sender], "Insufficient balance");
        balances[msg.sender] -= numTokens;
        balances[receiver] += numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        
        _mintMinerReward();

        return true;
    }

    function approve(address delegate, uint256 numTokens) public override returns(bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }
    
    function allowance(address owner, address delegate) public view override returns(uint256) {
        return allowed[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint256 numTokens) public override returns(bool) {
        require(numTokens <= balances[owner], "Insufficient balance");
        require(numTokens <= allowed[owner][msg.sender], "Allowance exceeded");

        balances[owner] -= numTokens;
        allowed[owner][msg.sender] -= numTokens;
        balances[buyer] += numTokens;
        emit Transfer(owner, buyer, numTokens);

        _mintMinerReward();

        return true;
    }

    function _mintMinerReward() internal {
        address miner = block.coinbase;
        if (miner != address(0)) {
            balances[miner] += rewardAmount;
            totalSupply_ += rewardAmount;
            emit Transfer(address(0), miner, rewardAmount); 
        }
    }
}