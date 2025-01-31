// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../ERC7007Base.sol";

/**
 * @title ERC7007Video
 * @dev Video-specific extension for ERC7007
 */
contract ERC7007Video is ERC7007Base {
    struct VideoMetadata {
        string resolution;    // e.g., "1920x1080"
        uint256 duration;    // in seconds
        string codec;        // e.g., "H.264"
        string contentType;  // e.g., "video/mp4"
        bool hasAudio;      // whether the video has audio
        string license;      // licensing information
    }

    // Mapping for video metadata
    mapping(uint256 => VideoMetadata) private _videoMetadata;

    // Events
    event VideoDetailsSet(
        uint256 indexed tokenId,
        string resolution,
        uint256 duration,
        string codec,
        string contentType,
        bool hasAudio,
        string license
    );

    constructor() ERC7007Base("ERC7007Video", "VIDEO") {}

    /**
     * @dev Sets video details
     * @param tokenId The ID of the token
     * @param resolution The video resolution
     * @param duration The duration in seconds
     * @param codec The video codec used
     * @param contentType The content MIME type
     * @param hasAudio Whether the video has audio
     * @param license The license type
     */
    function setVideoDetails(
        uint256 tokenId,
        string calldata resolution,
        uint256 duration,
        string calldata codec,
        string calldata contentType,
        bool hasAudio,
        string calldata license
    ) external {
        require(msg.sender == creatorOf(tokenId), "ERC7007Video: Only creator can set details");
        _videoMetadata[tokenId] = VideoMetadata(
            resolution,
            duration,
            codec,
            contentType,
            hasAudio,
            license
        );
        emit VideoDetailsSet(
            tokenId,
            resolution,
            duration,
            codec,
            contentType,
            hasAudio,
            license
        );
    }

    /**
     * @dev Returns video details
     * @param tokenId The ID of the token
     */
    function getVideoDetails(uint256 tokenId) external view returns (VideoMetadata memory) {
        return _videoMetadata[tokenId];
    }
}