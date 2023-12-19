// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.25 <0.9.0;

library Types {
    struct Product {
        bytes16 productId;
        address owner;
        string productName;
        string shippingDetails;
        uint256 timestamp;
        bool exists;
    }

    struct Transaction {
        address sender;
        address receiver;
    }
}
