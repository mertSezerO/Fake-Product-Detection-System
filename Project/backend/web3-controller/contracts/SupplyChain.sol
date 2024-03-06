// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Types.sol";
import "./ProductAction.sol";

contract SupplyChain {
    address public owner;
    mapping(bytes16 => Types.Transaction[]) public transactionHistory;
    address[] public suppliers;

    event TransactionCreated(
        bytes16 indexed productId,
        address indexed sender,
        address indexed receiver
    );

    constructor() {}

    function recordTransaction(bytes16 _productId, address _receiver) external {
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

    function getProductHistory(
        bytes16 _productId
    ) external view returns (Types.Transaction[] memory) {
        return transactionHistory[_productId];
    }

    function addSupplier(address _supplier) external {
        suppliers.push(_supplier);
    }

    function isSupplier(address _account) external view returns (bool) {
        for (uint i = 0; i < suppliers.length; i++) {
            if (suppliers[i] == _account) {
                return true;
            }
        }
        return false;
    }

    function setOwner(address _owner) public {
        owner = _owner;
    }
}
