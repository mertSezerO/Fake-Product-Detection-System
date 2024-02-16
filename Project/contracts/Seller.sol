// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Seller {
    address public owner;
    ProductAction productAction;
    Authentication authentication;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
        productAction = new productAction();
        authentication = new Authentication();
    }

    function editDestination() internal onlyOwner {
        productAction.updateProduct();
    }

    function findProduct() internal onlyOwner returns (Product){
        authentication.authenticate();
    }
}