// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./AccessControl.sol";

contract ProductRegistry {
    AccessControl internal accessControl;

    struct Product {
        bytes16 productId;
        address owner;
        string productName;
        string shippingDetails;
        string timestamp;
        bool exists;
    }

    mapping(bytes16 => Product) public products;
    event ProductRegistered(
        bytes16 indexed productId,
        address indexed owner,
        string productName
    );

    modifier isProductExist(bytes16 _productId) {
        require(
            products[_productId].exists,
            "Product with given id does not exist!"
        );
        _;
    }

    constructor() {
        accessControl = new AccessControl(msg.sender);
    }

    function getProductDetails(
        bytes16 _productId
    ) external view isProductExist(_productId) returns (Product memory) {
        return products[_productId];
    }

    function addProductDetails(
        bytes16 _productId,
        string memory _newDetails
    ) external isProductExist(_productId) returns (string memory) {
        return products[_productId].shippingDetails = _newDetails;
    }
}
