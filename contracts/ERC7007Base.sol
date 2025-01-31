// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./IERC7007.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ERC7007Base
 * @dev Base implementation of the ERC7007 standard with ERC721 compatibility
 */
abstract contract ERC7007Base is IERC7007, ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    mapping(uint256 => address) private _creators;
    mapping(uint256 => string) private _tokenURIs;

    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) Ownable() {}

    /**
     * @dev Modifier to verify token existence
     */
    modifier tokenExists(uint256 tokenId) {
        require(_exists(tokenId), "ERC7007: Token does not exist");
        _;
    }

    function creatorOf(uint256 tokenId) public view virtual override tokenExists(tokenId) returns (address) {
        return _creators[tokenId];
    }

    function tokenURI(uint256 tokenId) public view virtual override(ERC721, IERC7007) tokenExists(tokenId) returns (string memory) {
        return _tokenURIs[tokenId];
    }

    function mint(address to, string calldata tokenURI_) public virtual override returns (uint256) {
        require(to != address(0), "ERC7007: mint to zero address");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(to, newTokenId);
        _creators[newTokenId] = msg.sender;
        _tokenURIs[newTokenId] = tokenURI_;

        emit TokenMinted(newTokenId, msg.sender, tokenURI_);
        return newTokenId;
    }

    function updateMetadata(uint256 tokenId, string calldata newTokenURI) public virtual override tokenExists(tokenId) {
        require(msg.sender == _creators[tokenId], "ERC7007: Only creator can update metadata");
        _tokenURIs[tokenId] = newTokenURI;
        emit MetadataUpdated(tokenId, newTokenURI);
    }

    /**
     * @dev Override supportsInterface to support both ERC721 and ERC7007
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721) returns (bool) {
        return interfaceId == type(IERC7007).interfaceId || super.supportsInterface(interfaceId);
    }
}