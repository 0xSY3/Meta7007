
import { ethers } from "hardhat";

async function main() {
    console.log("\n=== ERC7007 Templates Demo ===\n");
    const [deployer, user1, user2] = await ethers.getSigners();
    console.log("Using deployer address:", deployer.address);

    // Deploy Art Contract
    console.log("\n1. Deploying Art NFT Contract...");
    const ERC7007Art = await ethers.getContractFactory("ERC7007Art");
    const art = await ERC7007Art.deploy();
    await art.deployed();
    console.log("✓ Art contract deployed to:", art.address);

    // Deploy Music Contract
    console.log("\n2. Deploying Music NFT Contract...");
    const ERC7007Music = await ethers.getContractFactory("ERC7007Music");
    const music = await ERC7007Music.deploy();
    await music.deployed();
    console.log("✓ Music contract deployed to:", music.address);

    // Deploy Game Asset Contract
    console.log("\n3. Deploying Game Asset NFT Contract...");
    const ERC7007GameAsset = await ethers.getContractFactory("ERC7007GameAsset");
    const gameAsset = await ERC7007GameAsset.deploy();
    await gameAsset.deployed();
    console.log("✓ Game Asset contract deployed to:", gameAsset.address);

    // Test Art NFT
    console.log("\n=== Testing Art NFT ===");
    const artMint = await art.mint(user1.address, "ipfs://art/test1");
    await artMint.wait();
    const artTokenId = 1;
    await art.setArtworkDetails(artTokenId, "1920x1080", "Digital Art");
    const artDetails = await art.getArtworkDetails(artTokenId);
    console.log("Art NFT Details:", {
        tokenId: artTokenId,
        owner: await art.ownerOf(artTokenId),
        dimensions: artDetails[0],
        medium: artDetails[1]
    });

    // Test Music NFT
    console.log("\n=== Testing Music NFT ===");
    const musicMint = await music.mint(user2.address, "ipfs://music/test1");
    await musicMint.wait();
    const musicTokenId = 1;
    await music.setMusicDetails(musicTokenId, "Electronic", 180, "CC-BY-4.0");
    const musicDetails = await music.getMusicDetails(musicTokenId);
    console.log("Music NFT Details:", {
        tokenId: musicTokenId,
        owner: await music.ownerOf(musicTokenId),
        genre: musicDetails.genre,
        duration: musicDetails.duration.toString(),
        license: musicDetails.license
    });

    // Test Game Asset
    console.log("\n=== Testing Game Asset NFT ===");
    const gameMint = await gameAsset.mint(user1.address, "ipfs://game/test1");
    await gameMint.wait();
    const gameTokenId = 1;
    await gameAsset.setGameAssetDetails(
        gameTokenId,
        "Sword",
        "Epic",
        5,
        [100, 50, 25],
        ["Sharp", "Flaming", "Ancient"],
        true,
        "1.0.0"
    );
    const gameDetails = await gameAsset.getGameAssetDetails(gameTokenId);
    console.log("Game Asset NFT Details:", {
        tokenId: gameTokenId,
        owner: await gameAsset.ownerOf(gameTokenId),
        type: gameDetails[0],
        rarity: gameDetails[1],
        level: gameDetails[2].toString(),
        stats: gameDetails[3].map(s => s.toString()),
        attributes: gameDetails[4],
        tradeable: gameDetails[5],
        gameVersion: gameDetails[6]
    });

    console.log("\n=== Demo completed successfully! ===\n");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
