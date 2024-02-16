// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Types.sol";


contract Customer {
    address public owner;
    Authentication authentication;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor(){
        owner = msg.sender;
        authentication = new Authentication();
    }

    function findProduct() internal onlyOwner returns(Product){
        authentication.findProduct();
    }

}
