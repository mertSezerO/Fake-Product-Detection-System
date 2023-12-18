// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract ProductRegistry {
    struct Product {
        bytes16 productId;
        string productName;
        string productDetails;
        string timestamp;
    }

    mapping (bytes16 => Product) public products;
}