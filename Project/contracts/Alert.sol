// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Alert {
    constructor() {}

    function alertManifacturer(address manifacturer) external pure {
        require(manifacturer != address(0), "Invalid manufacturer");
    }
}
