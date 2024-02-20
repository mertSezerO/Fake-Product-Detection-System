// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ProductAction.sol";
import "./SupplyChain.sol";

contract Controller {
    address public owner;
    ProductAction productAction;
    SupplyChain supplyChain;

    modifier onlyManufacturer() {
        require(msg.sender == owner, "Not the manufacturer");
        _;
    }

    modifier onlyAuthorized() {
        require(
            msg.sender == owner || supplyChain.isSupplier(msg.sender),
            "Not authorized"
        );
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
    ) internal onlyManufacturer {
        productAction.registerProduct(_productName, _productStatus);
    }

    function editProduct(
        bytes16 _productId,
        string memory _productName,
        string memory _productStatus
    ) internal view onlyManufacturer {
        productAction.updateProduct(_productId, _productName, _productStatus);
    }

    function addSupplier(address _supplier) internal onlyManufacturer {
        supplyChain.addSupplier(_supplier);
    }

    function createTransaction(
        bytes16 _productId,
        address _receiver
    ) internal onlyManufacturer {
        supplyChain.recordTransaction(_productId, _receiver);
    }

    function findProduct(
        bytes16 _productId
    ) internal view onlyAuthorized returns (Types.Product memory) {
        return productAction.findProduct(_productId);
    }

    function editProductStatus(
        bytes16 _productId,
        string memory _newStatus
    ) internal onlyAuthorized {
        productAction.addProductDetails(_productId, _newStatus);
    }
}
