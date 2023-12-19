// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract AccessControl {
    address public owner;
    mapping(address => bool) public authorizedUsers;

    event UserAdded(address indexed user);
    event UserRemoved(address indexed user);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    modifier onlyAuthorized() {
        require(authorizedUsers[msg.sender], "Not authorized");
        _;
    }

    constructor(address _owner) {
        owner = _owner;
        authorizedUsers[_owner] = true;
    }

    function addAuthorizedUser(address _user) external onlyOwner {
        require(_user != address(0), "Invalid user address");
        require(!authorizedUsers[_user], "User is already authorized");

        authorizedUsers[_user] = true;
        emit UserAdded(_user);
    }

    function removeAuthorizedUser(address _user) external onlyOwner {
        require(_user != address(0), "Invalid user address");
        require(authorizedUsers[_user], "User is not authorized");

        authorizedUsers[_user] = false;
        emit UserRemoved(_user);
    }

    function _onlyOwner(address _user) external view returns (bool) {
        return _user == owner;
    }

    function _onlyAuthorized(address _user) external view returns (bool) {
        return authorizedUsers[_user];
    }

    function getOwner() external view returns (address) {
        return owner;
    }
}
