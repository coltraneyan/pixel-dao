//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract PixelDAO {
    struct Member {
        string name;
        string colourOne;
        string colourTwo;
        string pixelMap;
        bool isMember;
    }

    uint256 public memberCount;
    address[] public addressList;

    mapping(address => Member) public searchMemberList;

    function addMember(
        string memory applicantName,
        string memory applicantColourOne,
        string memory applicantColourTwo,
        string memory applicantPixelMap,
        address applicantAddress
    ) public newMembersOnly(applicantAddress) {
        Member memory newMember = Member(
            applicantName,
            applicantColourOne,
            applicantColourTwo,
            applicantPixelMap,
            true
        );

        searchMemberList[applicantAddress] = newMember;
        memberCount += 1;
        return addressList.push(applicantAddress);
    }

    modifier newMembersOnly(address newAddress) {
        if (!searchMemberList[newAddress].isMember) {
            _;
        }
    }

    constructor() {
        addMember("The President", "white", "white", "0000000000", msg.sender);
    }
}
