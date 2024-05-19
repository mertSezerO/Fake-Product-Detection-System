// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

library Types {
    struct Product {
        bytes16 productId;
        address owner;
        string productName;
        string productionDate;
    }

    struct Transaction {
        address sender;
        address receiver;
        string productStatus;
        string transactionDate;
    }
}
