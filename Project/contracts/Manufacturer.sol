// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ProductAction.sol";
import "./SupplyChain.sol";

contract Manufacturer {
    address public owner;
    ProductAction productAction;
    SupplyChain supplyChain;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
        productAction = new ProductAction();
        supplyChain = new SupplyChain(productAction);
    }

    function addProduct() internal onlyOwner {
        productAction.registerProduct();
    }

    function editProduct() internal onlyOwner {
        productAction.updateProduct();
    }

    function addSupplier(address supplier) internal onlyOwner {
        supplyChain.addSupplier(supplier);
    }

    function createTransaction(address supplier) internal onlyOwner {
        supplyChain.recordTransaction(supplier);
    }
}
