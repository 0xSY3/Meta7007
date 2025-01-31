// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../ERC7007Base.sol";

/**
 * @title ERC7007GameAsset
 * @dev Game asset-specific extension for ERC7007
 */
contract ERC7007GameAsset is ERC7007Base {
    struct GameAssetMetadata {
        string assetType;      // e.g., "Weapon", "Armor", "Consumable"
        string rarity;         // e.g., "Common", "Rare", "Legendary"
        uint256 level;         // Asset level/tier
        uint256[] stats;       // Array of numerical stats (attack, defense, etc.)
        string[] attributes;   // Array of string attributes (elements, effects, etc.)
        bool tradeable;        // Whether the asset can be traded
        string gameVersion;    // Compatible game version
    }

    // Mapping for game asset metadata
    mapping(uint256 => GameAssetMetadata) private _gameAssetMetadata;

    // Events
    event GameAssetDetailsSet(
        uint256 indexed tokenId,
        string assetType,
        string rarity,
        uint256 level,
        bool tradeable,
        string gameVersion
    );

    event GameAssetStatsUpdated(uint256 indexed tokenId, uint256[] stats);
    event GameAssetAttributesUpdated(uint256 indexed tokenId, string[] attributes);

    constructor() ERC7007Base("ERC7007GameAsset", "GAME") {}

    /**
     * @dev Sets game asset details
     */
    function setGameAssetDetails(
        uint256 tokenId,
        string memory assetType,
        string memory rarity,
        uint256 level,
        uint256[] memory stats,
        string[] memory attributes,
        bool tradeable,
        string memory gameVersion
    ) external {
        require(msg.sender == creatorOf(tokenId), "ERC7007GameAsset: Only creator can set details");
        _gameAssetMetadata[tokenId].assetType = assetType;
        _gameAssetMetadata[tokenId].rarity = rarity;
        _gameAssetMetadata[tokenId].level = level;
        _gameAssetMetadata[tokenId].stats = stats;
        _gameAssetMetadata[tokenId].attributes = attributes;
        _gameAssetMetadata[tokenId].tradeable = tradeable;
        _gameAssetMetadata[tokenId].gameVersion = gameVersion;

        emit GameAssetDetailsSet(
            tokenId,
            assetType,
            rarity,
            level,
            tradeable,
            gameVersion
        );
        emit GameAssetStatsUpdated(tokenId, stats);
        emit GameAssetAttributesUpdated(tokenId, attributes);
    }

    /**
     * @dev Returns game asset details
     */
    function getGameAssetDetails(uint256 tokenId) external view returns (
        string memory assetType,
        string memory rarity,
        uint256 level,
        uint256[] memory stats,
        string[] memory attributes,
        bool tradeable,
        string memory gameVersion
    ) {
        GameAssetMetadata storage metadata = _gameAssetMetadata[tokenId];
        return (
            metadata.assetType,
            metadata.rarity,
            metadata.level,
            metadata.stats,
            metadata.attributes,
            metadata.tradeable,
            metadata.gameVersion
        );
    }

    /**
     * @dev Updates asset stats
     */
    function updateAssetStats(uint256 tokenId, uint256[] memory newStats) external {
        require(msg.sender == creatorOf(tokenId), "ERC7007GameAsset: Only creator can update stats");
        _gameAssetMetadata[tokenId].stats = newStats;
        emit GameAssetStatsUpdated(tokenId, newStats);
    }

    /**
     * @dev Updates asset attributes
     */
    function updateAssetAttributes(uint256 tokenId, string[] memory newAttributes) external {
        require(msg.sender == creatorOf(tokenId), "ERC7007GameAsset: Only creator can update attributes");
        _gameAssetMetadata[tokenId].attributes = newAttributes;
        emit GameAssetAttributesUpdated(tokenId, newAttributes);
    }

    /**
     * @dev Updates asset level
     */
    function updateAssetLevel(uint256 tokenId, uint256 newLevel) external {
        require(msg.sender == creatorOf(tokenId), "ERC7007GameAsset: Only creator can update level");
        _gameAssetMetadata[tokenId].level = newLevel;
    }
}