// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Types.sol";
import "./AccessControl.sol";

contract ProductRegistry {
    AccessControl internal accessControl;

    mapping(bytes16 => Types.Product) public products;
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

    function generateUUID() internal view returns (bytes16) {
        return
            bytes16(keccak256(abi.encodePacked(block.timestamp, msg.sender)));
    }

    function getProductFromId(
        bytes16 _productId
    ) external view returns (Types.Product memory) {
        return products[_productId];
    }

    function getProductDetails(
        bytes16 _productId
    ) external view isProductExist(_productId) returns (Types.Product memory) {
        return products[_productId];
    }

    function addProductDetails(
        bytes16 _productId,
        string memory _newDetails
    ) external isProductExist(_productId) returns (string memory) {
        return products[_productId].shippingDetails = _newDetails;
    }

    function registerProduct(
        string memory _productName,
        string memory _shippingDetails,
        bool _exists
    ) external {
        bytes16 productId = generateUUID();
        products[productId] = Types.Product({
            productId: productId,
            owner: accessControl.getOwner(),
            productName: _productName,
            shippingDetails: _shippingDetails,
            timestamp: block.timestamp,
            exists: _exists
        });

        emit ProductRegistered(
            productId,
            accessControl.getOwner(),
            _productName
        );
    }
}
