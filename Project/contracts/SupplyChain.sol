// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract SupplyChain {
    struct Transaction {
        address sender;
        address receiver;
    }

    //Instead of bytes16, Product will be used.
    mapping(bytes16 => Transaction[]) public transactionHistory;

    //sender parameter will be replaced
    function recordTransaction(
        bytes16 _productId,
        address _sender,
        address _receiver
    ) external {
        require(
            _sender != _receiver,
            "The sender and the receiver cannot be the same"
        );

        if (transactionHistory[_productId].length == 0) {
            //sender = product.owner
        } else {
            //sender = transactionHistory[product].receiver
        }
        transactionHistory[_productId].push(
            Transaction({sender: _sender, receiver: _receiver})
        );
    }

    function getProductHistory(
        bytes16 _productId
    ) external view returns (Transaction[] memory) {
        return transactionHistory[_productId];
    }
}
