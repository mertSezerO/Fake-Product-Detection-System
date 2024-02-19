// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ProductAction.sol";

contract Seller {
    address public owner;
    ProductAction productAction;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    constructor() {
        owner = msg.sender;
        productAction = new ProductAction(owner);
    }

    function editDestination(
        bytes16 _productId,
        string memory _details
    ) internal onlyOwner {
        productAction.addProductDetails(_productId, _details);
    }

    function findProduct(
        bytes16 _productId
    ) internal view onlyOwner returns (Types.Product memory) {
        return productAction.findProduct(_productId);
    }
}
