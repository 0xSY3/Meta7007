// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../ERC7007Base.sol";

/**
 * @title ERC721Integration
 * @dev Example of ERC7007 integration with ERC721
 */
contract ERC721Integration is ERC7007Base {
    constructor() ERC7007Base("ERC721Integration", "E721") {}

    /**
     * @dev Overrides the mint function to include additional functionality
     */
    function mint(address to, string calldata tokenURI_) public virtual override returns (uint256) {
        return super.mint(to, tokenURI_);
    }

    /**
     * @dev Required override for URI handling
     */
    function _baseURI() internal pure virtual override returns (string memory) {
        return "ipfs://";
    }
}