// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Types.sol";

contract ProductAction {
    address public owner;

    event ProductCreated(bytes16 productId);
    event ProductUpdated(
        bytes16 productId,
        string productName,
        string productStatus
    );
    event ProductAccessed(Types.Product product);
    event ProductDetailsUpdated(bytes16 productId, string productStatus);

    mapping(bytes16 => Types.Product) public products;

    modifier onlyManufacturer() {
        require(msg.sender == owner, "Not the manufacturer");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function registerProduct(
        string memory _productName,
        string memory _productStatus
    ) external onlyManufacturer {
        bytes16 productId = generateUUID();
        products[productId] = Types.Product({
            productId: productId,
            owner: owner,
            productName: _productName,
            productStatus: _productStatus,
            timestamp: block.timestamp
        });
        emit ProductCreated(productId);
    }

    function updateProduct(
        bytes16 _productId,
        string memory _productName,
        string memory _productStatus
    ) external onlyManufacturer {
        Types.Product memory product = products[_productId];
        product.productName = _productName;
        product.productStatus = _productStatus;
        emit ProductUpdated(
            product.productId,
            product.productName,
            product.productStatus
        );
    }

    function generateUUID() internal view returns (bytes16) {
        return
            bytes16(keccak256(abi.encodePacked(block.timestamp, msg.sender)));
    }

    function addProductDetails(
        bytes16 _productId,
        string memory _newDetails
    ) external onlyManufacturer {
        products[_productId].productStatus = _newDetails;
        emit ProductDetailsUpdated(
            _productId,
            products[_productId].productStatus
        );
    }

    function findProduct(bytes16 _productId) external {
        emit ProductAccessed(products[_productId]);
    }
}
