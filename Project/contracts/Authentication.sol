// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Types.sol";
import "./ProductRegistry.sol";
import "./Alert.sol";

contract Authentication {
    ProductRegistry productRegistry;
    Alert alertContract;

    constructor(ProductRegistry productReg) {
        productRegistry = productReg;
        alertContract = new Alert();
    }

    function authenticateProduct(
        bytes16 _productId
    ) external view returns (Types.Product memory) {
        Types.Product memory product = productRegistry.getProductFromId(
            _productId
        );
        require(
            product.owner == msg.sender,
            alertContract.alertManifacturer(product.owner)
        );
    }
}
