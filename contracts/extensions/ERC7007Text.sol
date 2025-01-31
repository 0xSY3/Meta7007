// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../ERC7007Base.sol";

/**
 * @title ERC7007Text
 * @dev Text-specific extension for ERC7007
 */
contract ERC7007Text is ERC7007Base {
    struct TextMetadata {
        string language;
        string category;
        uint256 wordCount;
    }

    // Mapping for text metadata
    mapping(uint256 => TextMetadata) private _textMetadata;

    event TextDetailsSet(uint256 indexed tokenId, string language, string category, uint256 wordCount);

    constructor() ERC7007Base("ERC7007Text", "TEXT") {}

    /**
     * @dev Sets text details
     * @param tokenId The ID of the token
     * @param language The language of the text
     * @param category The category of the text
     * @param wordCount The word count
     */
    function setTextDetails(
        uint256 tokenId,
        string calldata language,
        string calldata category,
        uint256 wordCount
    ) external {
        require(msg.sender == creatorOf(tokenId), "ERC7007Text: Only creator can set details");
        _textMetadata[tokenId] = TextMetadata(language, category, wordCount);
        emit TextDetailsSet(tokenId, language, category, wordCount);
    }

    /**
     * @dev Returns text details
     * @param tokenId The ID of the token
     */
    function getTextDetails(uint256 tokenId) external view returns (TextMetadata memory) {
        return _textMetadata[tokenId];
    }
}