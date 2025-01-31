# ERC-7007 Smart Contract Templates Library 🚀

A comprehensive implementation of the ERC-7007 standard providing gas-optimized, modular extensions for handling diverse digital asset metadata across multiple domains. This library enables developers to create and manage NFTs with rich, domain-specific metadata while maintaining high efficiency and flexibility.

## 📋 Overview

The ERC-7007 standard extends traditional NFT functionality with enhanced metadata management and creator-centric features. This implementation provides a suite of specialized extensions for different types of digital assets:

- 🎨 Art NFTs with detailed artwork properties
- 🎵 Music NFTs with comprehensive audio metadata
- 📝 Text NFTs for literary works
- 🎬 Video NFTs with rich media attributes
- 🎮 Game Asset NFTs with dynamic properties

## 🌟 Features

### Core Implementation
- **Gas-Optimized Base Contract**: Efficient implementation of core ERC-7007 functionality
- **Advanced Metadata Management**: Flexible and extensible token URI handling
- **Creator Controls**: Built-in creator-based permissions system
- **ERC-721 Compatibility**: Seamless integration with existing NFT infrastructure

### Extensions Suite

#### 1. 🎨 Art Extension (`ERC7007Art`)
```solidity
// Example: Creating and configuring an artwork NFT
const artToken = await artContract.mint(receiverAddress, "ipfs://artwork-metadata");
await artContract.setArtworkDetails(
    tokenId,
    "2000x3000",  // dimensions
    "Oil on canvas"  // medium
);
```

#### 2. 🎵 Music Extension (`ERC7007Music`)
```solidity
// Example: Setting up a music NFT with licensing
await musicContract.setMusicDetails(
    tokenId,
    "Classical",
    300,  // duration in seconds
    "CC BY-SA 4.0"  // license
);
```

#### 3. 📝 Text Extension (`ERC7007Text`)
```solidity
// Example: Creating a text-based NFT
await textContract.setTextDetails(
    tokenId,
    "English",
    "Poetry",
    1000  // word count
);
```

#### 4. 🎬 Video Extension (`ERC7007Video`)
```solidity
// Example: Configuring a video NFT
await videoContract.setVideoDetails(
    tokenId,
    "1920x1080",  // resolution
    180,          // duration in seconds
    "H.264",      // codec
    "video/mp4",  // content type
    true,         // has audio
    "CC BY 4.0"   // license
);
```

#### 5. 🎮 Game Asset Extension (`ERC7007GameAsset`)
```solidity
// Example: Creating a dynamic game asset
await gameAsset.setGameAssetDetails(
    tokenId,
    "Weapon",      // type
    "Legendary",   // rarity
    10,           // level
    [100, 50, 75], // stats
    ["Fire", "Legendary"], // attributes
    true,         // tradeable
    "1.0.0"       // version
);
```

## 🛠️ Installation & Setup

1. Clone the repository
```bash
git clone https://github.com/your-username/erc7007-templates.git
cd erc7007-templates
```

2. Install dependencies
```bash
npm install
```

3. Compile contracts
```bash
npx hardhat compile
```

## 🧪 Testing

Run the comprehensive test suite:
```bash
npx hardhat test
```

For testing specific extensions:
```bash
npx hardhat run scripts/test-extensions.ts
```

## 📊 Gas Optimization Features

Our contracts implement several gas optimization techniques:

- **Storage Packing**: Optimized struct layouts to minimize storage slots
- **Memory vs Storage**: Strategic use of memory and storage references
- **Efficient Event Emission**: Optimized event parameter indexing
- **Minimal Storage Writes**: Batch operations to reduce storage operations
- **Function Visibility**: Proper use of external vs public visibility
- **Custom Errors**: Use of custom errors instead of strings for cheaper reverts

## 🔧 Project Structure
```
contracts/
├── ERC7007Base.sol       # Core implementation
├── IERC7007.sol          # Interface definition
└── extensions/           # NFT Extensions
    ├── ERC7007Art.sol
    ├── ERC7007Music.sol
    ├── ERC7007Text.sol
    ├── ERC7007Video.sol
    └── ERC7007GameAsset.sol
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Security

This library implements several security best practices:

- Access control mechanisms
- Input validation
- Event emission for transparency
- Reentrancy protection
- Integer overflow protection (Solidity >=0.8.0)

Always conduct a thorough security audit before deploying to production.