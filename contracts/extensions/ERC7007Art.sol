// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../ERC7007Base.sol";

/**
 * @title ERC7007Art
 * @dev Art-specific extension for ERC7007
 */
contract ERC7007Art is ERC7007Base {
    struct ArtworkDetails {
        string dimensions;
        string medium;
        bool initialized;
    }

    // Mapping for artwork details
    mapping(uint256 => ArtworkDetails) private _artworkDetails;

    event ArtworkDetailsSet(uint256 indexed tokenId, string dimensions, string medium);

    constructor() ERC7007Base("ERC7007Art", "ART") {}

    /**
     * @dev Sets artwork details
     */
    function setArtworkDetails(
        uint256 tokenId,
        string memory dimensions,
        string memory medium
    ) external {
        require(_exists(tokenId), "ERC7007Art: Token does not exist");
        require(msg.sender == creatorOf(tokenId), "ERC7007Art: Only creator can set details");

        _artworkDetails[tokenId] = ArtworkDetails({
            dimensions: dimensions,
            medium: medium,
            initialized: true
        });

        emit ArtworkDetailsSet(tokenId, dimensions, medium);
    }

    /**
     * @dev Returns artwork details
     */
    function getArtworkDetails(uint256 tokenId) external view returns (string memory, string memory) {
        require(_exists(tokenId), "ERC7007Art: Token does not exist");
        require(_artworkDetails[tokenId].initialized, "ERC7007Art: Details not set");

        ArtworkDetails memory details = _artworkDetails[tokenId];
        return (details.dimensions, details.medium);
    }

    /**
     * @dev Override mint to ensure proper initialization
     */
    function mint(address to, string calldata tokenURI_) public virtual override returns (uint256) {
        uint256 tokenId = super.mint(to, tokenURI_);
        return tokenId;
    }
}