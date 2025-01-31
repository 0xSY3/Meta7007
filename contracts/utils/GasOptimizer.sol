// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title GasOptimizer
 * @dev Collection of gas optimization patterns
 */
library GasOptimizer {
    /**
     * @dev Optimized string concatenation
     */
    function concat(string memory a, string memory b) internal pure returns (string memory) {
        return string(abi.encodePacked(a, b));
    }

    /**
     * @dev Optimized array operations
     */
    function removeFromArray(uint256[] storage array, uint256 index) internal {
        require(index < array.length, "Index out of bounds");
        array[index] = array[array.length - 1];
        array.pop();
    }

    /**
     * @dev Optimized storage packing
     */
    function packUints(uint128 a, uint128 b) internal pure returns (uint256) {
        return (uint256(a) << 128) | uint256(b);
    }

    /**
     * @dev Unpack stored uint256 into two uint128
     */
    function unpackUints(uint256 packed) internal pure returns (uint128, uint128) {
        return (uint128(packed >> 128), uint128(packed));
    }
}
