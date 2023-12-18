// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract AccessControl {
    address public owner;
    mapping(address => bool) public authorizedUsers;

    event UserAdded(address indexed user);
    event UserRemoved(address indexed user);

    modifier onlyManufacturer() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    modifier onlyAuthorized() {
        require(authorizedUsers[msg.sender], "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addAuthorizedUser(address _user) external onlyManufacturer {
        require(_user != address(0), "Invalid user address");
        require(!authorizedUsers[_user], "User is already authorized");

        authorizedUsers[_user] = true;
        emit UserAdded(_user);
    }

    function removeAuthorizedUser(address _user) external onlyManufacturer {
        require(_user != address(0), "Invalid user address");
        require(authorizedUsers[_user], "User is not authorized");

        authorizedUsers[_user] = false;
        emit UserRemoved(_user);
    }
}
