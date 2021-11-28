pragma solidity ^0.8.4;
// SPDX-License-Identifier: Unlicensed

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MPARKToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("META PARK", "MPARK") {
        _mint(msg.sender, initialSupply);
    }
}