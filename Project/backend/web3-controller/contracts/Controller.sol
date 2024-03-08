// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Controller {
    address public owner;

    event ProductAddition(string productName, string productStatus);
    event ProductEdit(
        bytes16 productId,
        string productName,
        string productStatus
    );
    event SupplierAddition(address supplier);
    event TransactionRecord(bytes16 _productId, address _receiver);
    event ProductSearch(bytes16 _productId);
    event DetailsUpdate(bytes16 _productId, string _newStatus);

    // modifier onlyAuthorized() {
    //     require(
    //         msg.sender == owner || supplyChain.isSupplier(msg.sender),
    //         "Not authorized"
    //     );
    //     _;
    // }

    modifier onlyManufacturer() {
        require(msg.sender == owner, "Not the manufacturer");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addProduct(
        string memory _productName,
        string memory _productStatus
    ) public onlyManufacturer {
        emit ProductAddition(_productName, _productStatus);
    }

    function editProduct(
        bytes16 _productId,
        string memory _productName,
        string memory _productStatus
    ) public onlyManufacturer {
        emit ProductEdit(_productId, _productName, _productStatus);
    }

    function addSupplier(address _supplier) public onlyManufacturer {
        emit SupplierAddition(_supplier);
    }

    function createTransaction(
        bytes16 _productId,
        address _receiver
    ) public onlyManufacturer {
        emit TransactionRecord(_productId, _receiver);
    }

    function findProduct(bytes16 _productId) public {
        emit ProductSearch(_productId);
    }

    function editProductStatus(
        bytes16 _productId,
        string memory _newStatus
    ) public onlyManufacturer {
        emit DetailsUpdate(_productId, _newStatus);
    }
}
