// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Types.sol";
import "./ProductAction.sol";

contract SupplyChain {
    address public owner;
    mapping(bytes16 => Types.Transaction[]) public transactionHistory;
    address[] public suppliers;

    event ProductTransactionAccessed(
        bytes16 productId,
        Types.Transaction[] transactions
    );
    event TransactionCreated(
        bytes16 indexed productId,
        address indexed sender,
        address indexed receiver
    );
    event SupplierAdded(address supplier);

    modifier onlyManufacturer() {
        require(msg.sender == owner, "Not the manufacturer");
        _;
    }

    modifier onlyAuthorized() {
        require(
            (msg.sender == owner) || isSupplier(owner),
            "Not the manufacturer"
        );
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function recordTransaction(
        bytes16 _productId,
        address _receiver
    ) external onlyManufacturer {
        address sender;
        if (transactionHistory[_productId].length == 0) {
            sender = owner;
        } else {
            // Bir önceki göndereni alıcı olarak kaydediyoruz.
            uint length = transactionHistory[_productId].length;
            sender = transactionHistory[_productId][length - 1].receiver;
        }
        transactionHistory[_productId].push(
            Types.Transaction({sender: sender, receiver: _receiver})
        );
        emit TransactionCreated(_productId, sender, _receiver);
    }

    function getProductHistory(bytes16 _productId) external {
        emit ProductTransactionAccessed(
            _productId,
            transactionHistory[_productId]
        );
    }

    function addSupplier(address _supplier) external onlyManufacturer {
        suppliers.push(_supplier);
        emit SupplierAdded(_supplier);
    }

    function isSupplier(address _account) internal view returns (bool) {
        for (uint i = 0; i < suppliers.length; i++) {
            if (suppliers[i] == _account) {
                return true;
            }
        }
        return false;
    }
}
