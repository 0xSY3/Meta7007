// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title IERC7007 Interface
 * @dev Interface for the ERC7007 standard
 */
interface IERC7007 {
    /**
     * @dev Emitted when a new token is minted
     */
    event TokenMinted(uint256 indexed tokenId, address indexed creator, string tokenURI);

    /**
     * @dev Emitted when token metadata is updated
     */
    event MetadataUpdated(uint256 indexed tokenId, string newTokenURI);

    /**
     * @dev Returns the creator of a token
     * @param tokenId The ID of the token
     */
    function creatorOf(uint256 tokenId) external view returns (address);

    /**
     * @dev Returns the token URI
     * @param tokenId The ID of the token
     */
    function tokenURI(uint256 tokenId) external view returns (string memory);

    /**
     * @dev Mints a new token
     * @param to The address that will own the minted token
     * @param tokenURI_ The token URI
     */
    function mint(address to, string calldata tokenURI_) external returns (uint256);

    /**
     * @dev Updates token metadata
     * @param tokenId The ID of the token to update
     * @param newTokenURI The new token URI
     */
    function updateMetadata(uint256 tokenId, string calldata newTokenURI) external;
}
