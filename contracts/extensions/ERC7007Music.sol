// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../ERC7007Base.sol";

/**
 * @title ERC7007Music
 * @dev Music-specific extension for ERC7007
 */
contract ERC7007Music is ERC7007Base {
    struct MusicMetadata {
        string genre;
        uint256 duration;
        string license;
        bool initialized;
    }

    // Mapping for music metadata
    mapping(uint256 => MusicMetadata) private _musicMetadata;

    event MusicDetailsSet(uint256 indexed tokenId, string genre, uint256 duration, string license);

    constructor() ERC7007Base("ERC7007Music", "MUSIC") {}

    /**
     * @dev Sets music details
     * @param tokenId The ID of the token
     * @param genre The genre of the music
     * @param duration The duration in seconds
     * @param license The license type
     */
    function setMusicDetails(
        uint256 tokenId,
        string calldata genre,
        uint256 duration,
        string calldata license
    ) external {
        require(_exists(tokenId), "ERC7007Music: Token does not exist");
        require(msg.sender == creatorOf(tokenId), "ERC7007Music: Only creator can set details");

        _musicMetadata[tokenId] = MusicMetadata({
            genre: genre,
            duration: duration,
            license: license,
            initialized: true
        });

        emit MusicDetailsSet(tokenId, genre, duration, license);
    }

    /**
     * @dev Returns music details
     * @param tokenId The ID of the token
     */
    function getMusicDetails(uint256 tokenId) external view returns (MusicMetadata memory) {
        require(_exists(tokenId), "ERC7007Music: Token does not exist");
        require(_musicMetadata[tokenId].initialized, "ERC7007Music: Details not set");

        return _musicMetadata[tokenId];
    }

    /**
     * @dev Override mint to ensure proper initialization
     */
    function mint(address to, string calldata tokenURI_) public virtual override returns (uint256) {
        uint256 tokenId = super.mint(to, tokenURI_);
        return tokenId;
    }
}