// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Types.sol";
import "./ProductAction.sol";

contract SupplyChain {
    address public owner;
    mapping(bytes16 => Types.Transaction[]) public transactionHistory;
    string[] public suppliers;

    event TransactionCreated(
        bytes16 indexed productId,
        address indexed sender,
        address indexed receiver
    );

    constructor(address _owner) {
        owner = _owner;
    }

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

    function addSupplier(string memory _supplier) external {
        suppliers.push(_supplier);
    }
}
