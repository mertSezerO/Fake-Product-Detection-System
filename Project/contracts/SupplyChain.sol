// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Types.sol";
import "./ProductRegistry.sol";

contract SupplyChain {
    ProductRegistry productRegistry;

    mapping(bytes16 => Types.Transaction[]) public transactionHistory;
    event TransactionCreated(
        bytes16 indexed productId,
        address indexed sender,
        address indexed receiver
    );

    constructor() {
        productRegistry = new ProductRegistry();
    }

    function recordTransaction(bytes16 _productId, address _receiver) external {
        Types.Product memory product = productRegistry.getProductFromId(
            _productId
        );
        address sender;
        if (transactionHistory[product.productId].length == 0) {
            sender = product.owner;
        } else {
            uint length = transactionHistory[product.productId].length;
            sender = transactionHistory[product.productId][length - 1].receiver;
        }
        transactionHistory[product.productId].push(
            Types.Transaction({sender: sender, receiver: _receiver})
        );
        emit TransactionCreated(product.productId, sender, _receiver);
    }

    function getProductHistory(
        bytes16 _productId
    ) external view returns (Types.Transaction[] memory) {
        return transactionHistory[_productId];
    }
}
