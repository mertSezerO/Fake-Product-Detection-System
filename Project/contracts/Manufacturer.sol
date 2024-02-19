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
        productAction = new ProductAction(owner);
        supplyChain = new SupplyChain(owner);
    }

    function addProduct(
        string memory _productName,
        string memory _productStatus
    ) internal onlyOwner {
        productAction.registerProduct(_productName, _productStatus);
    }

    function editProduct(
        bytes16 _productId,
        string memory _productName,
        string memory _productStatus
    ) internal view onlyOwner {
        productAction.updateProduct(_productId, _productName, _productStatus);
    }

    function addSupplier(string memory _supplier) internal onlyOwner {
        supplyChain.addSupplier(_supplier);
    }

    function createTransaction(
        bytes16 _productId,
        address _receiver
    ) internal onlyOwner {
        supplyChain.recordTransaction(_productId, _receiver);
    }
}
