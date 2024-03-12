// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Types.sol";

contract ProductAction {
    address public owner;

    mapping(bytes16 => Types.Product) public products;

    constructor() {}

    function registerProduct(
        string memory _productName,
        string memory _productStatus
    ) external returns (bytes16) {
        bytes16 productId = generateUUID();
        products[productId] = Types.Product({
            productId: productId,
            owner: owner,
            productName: _productName,
            productStatus: _productStatus,
            timestamp: block.timestamp
        });
        return productId;
    }

    function updateProduct(
        bytes16 _productId,
        string memory _productName,
        string memory _productStatus
    ) external view {
        Types.Product memory product = products[_productId];
        product.productName = _productName;
        product.productStatus = _productStatus;
    }

    function generateUUID() internal view returns (bytes16) {
        return
            bytes16(keccak256(abi.encodePacked(block.timestamp, msg.sender)));
    }

    function getProductDetails(
        bytes16 _productId
    ) external view returns (Types.Product memory) {
        return products[_productId];
    }

    function addProductDetails(
        bytes16 _productId,
        string memory _newDetails
    ) external returns (string memory) {
        return products[_productId].productStatus = _newDetails;
    }

    function findProduct(
        bytes16 _productId
    ) external view returns (Types.Product memory) {
        return products[_productId];
    }

    function setOwner(address _owner) public {
        owner = _owner;
    }
}
