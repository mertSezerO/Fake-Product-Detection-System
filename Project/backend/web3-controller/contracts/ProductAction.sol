// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Types.sol";

contract ProductAction {
    address public owner;

    event ProductCreated(
        bytes16 productId,
        string productName,
        string productionDate
    );
    event ProductUpdated(bytes16 productId, string productName);
    event ProductAccessed(Types.Product product);
    event ProductsReturned(Types.Product[] products);
    event ProductDetailsUpdated(bytes16 productId);

    mapping(bytes16 => Types.Product) public products;
    Types.Product[] productList;

    modifier onlyManufacturer() {
        require(msg.sender == owner, "Not the manufacturer");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function registerProduct(
        string memory _productName,
        string memory _date
    ) external onlyManufacturer {
        bytes16 productId = generateUUID();
        products[productId] = Types.Product({
            productId: productId,
            owner: owner,
            productName: _productName,
            productionDate: _date
        });
        productList.push(products[productId]);
        emit ProductCreated(productId, _productName, _date);
    }

    function updateProduct(
        bytes16 _productId,
        string memory _productName
    ) external onlyManufacturer {
        Types.Product memory product = products[_productId];
        product.productName = _productName;
        emit ProductUpdated(product.productId, product.productName);
    }

    function generateUUID() internal view returns (bytes16) {
        return
            bytes16(keccak256(abi.encodePacked(block.timestamp, msg.sender)));
    }

    function findProduct(bytes16 _productId) external {
        emit ProductAccessed(products[_productId]);
    }

    function getAllProducts() public {
        emit ProductsReturned(productList);
    }
}
