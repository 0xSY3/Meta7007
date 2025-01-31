// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../contracts/ERC7007Base.sol";

contract BaseTest is Test {
    ERC7007Base public token;
    address public owner;
    address public addr1;
    address public addr2;

    function setUp() public {
        owner = address(this);
        addr1 = makeAddr("addr1");
        addr2 = makeAddr("addr2");
        
        token = new ERC7007Base();
    }

    function testMint() public {
        string memory tokenURI = "ipfs://test";
        vm.expectEmit(true, true, true, true);
        emit TokenMinted(1, owner, tokenURI);
        
        uint256 tokenId = token.mint(addr1, tokenURI);
        
        assertEq(token.creatorOf(tokenId), owner);
        assertEq(token.tokenURI(tokenId), tokenURI);
    }

    function testFailMintToZeroAddress() public {
        token.mint(address(0), "ipfs://test");
    }

    function testUpdateMetadata() public {
        string memory oldURI = "ipfs://old";
        string memory newURI = "ipfs://new";
        
        token.mint(addr1, oldURI);
        
        vm.expectEmit(true, true, true, true);
        emit MetadataUpdated(1, newURI);
        
        token.updateMetadata(1, newURI);
        assertEq(token.tokenURI(1), newURI);
    }

    function testFailNonCreatorUpdateMetadata() public {
        token.mint(addr1, "ipfs://test");
        vm.prank(addr1);
        token.updateMetadata(1, "ipfs://new");
    }
}
