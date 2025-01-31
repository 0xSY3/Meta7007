import { ethers } from "hardhat";

async function testArtExtension() {
  console.log("\n=== Testing Art Extension ===");
  try {
    // Deploy a fresh instance
    const ArtFactory = await ethers.getContractFactory("ERC7007Art");
    const contract = await ArtFactory.deploy();
    await contract.deployed();
    console.log("Art contract deployed to:", contract.address);

    const [owner] = await ethers.getSigners();
    console.log("Testing with address:", owner.address);

    // Verify contract deployment
    const name = await contract.name();
    console.log("Contract name:", name);

    // Mint a new NFT
    console.log("Minting new art NFT...");
    const mintTx = await contract.mint(owner.address, "ipfs://art-test");
    console.log("Mint transaction submitted:", mintTx.hash);
    const receipt = await mintTx.wait();

    // Find the TokenMinted event
    const event = receipt.events?.find((e: any) => e.event === 'TokenMinted');
    if (!event || !event.args) {
      throw new Error("Failed to get TokenMinted event");
    }

    const tokenId = event.args.tokenId;
    console.log("Minted Art NFT with ID:", tokenId.toString());

    // Set artwork details
    console.log("Setting artwork details...");
    const detailsTx = await contract.setArtworkDetails(tokenId, "1920x1080", "Digital Art");
    await detailsTx.wait();

    // Verify details
    console.log("Verifying artwork details...");
    const [dimensions, medium] = await contract.getArtworkDetails(tokenId);
    console.log("Art Details - Dimensions:", dimensions, "Medium:", medium);

    return true;
  } catch (error: unknown) {
    console.error("Art Extension Test Failed:", error);
    if ((error as any).receipt) {
      console.error("Transaction receipt:", (error as any).receipt);
    }
    return false;
  }
}

async function testMusicExtension() {
  console.log("\n=== Testing Music Extension ===");
  try {
    // Deploy a fresh instance
    const MusicFactory = await ethers.getContractFactory("ERC7007Music");
    const contract = await MusicFactory.deploy();
    await contract.deployed();
    console.log("Music contract deployed to:", contract.address);

    const [owner] = await ethers.getSigners();
    console.log("Testing with address:", owner.address);

    // Verify contract deployment
    const name = await contract.name();
    console.log("Contract name:", name);

    // Mint a new NFT
    console.log("Minting new music NFT...");
    const mintTx = await contract.mint(owner.address, "ipfs://music-test");
    console.log("Mint transaction submitted:", mintTx.hash);
    const receipt = await mintTx.wait();

    // Find the TokenMinted event
    const event = receipt.events?.find((e: any) => e.event === 'TokenMinted');
    if (!event || !event.args) {
      throw new Error("Failed to get TokenMinted event");
    }

    const tokenId = event.args.tokenId;
    console.log("Minted Music NFT with ID:", tokenId.toString());

    // Set music details
    console.log("Setting music details...");
    const detailsTx = await contract.setMusicDetails(
      tokenId,
      "Classical",
      300, // 5 minutes duration
      "CC BY-SA 4.0"
    );
    await detailsTx.wait();

    // Verify details
    console.log("Verifying music details...");
    const metadata = await contract.getMusicDetails(tokenId);
    console.log("Music Details:", {
      genre: metadata.genre,
      duration: metadata.duration.toString(),
      license: metadata.license
    });

    return true;
  } catch (error: unknown) {
    console.error("Music Extension Test Failed:", error);
    if ((error as any).receipt) {
      console.error("Transaction receipt:", (error as any).receipt);
    }
    return false;
  }
}

async function testTextExtension() {
  console.log("\n=== Testing Text Extension ===");
  try {
    // Deploy a fresh instance
    const TextFactory = await ethers.getContractFactory("ERC7007Text");
    const contract = await TextFactory.deploy();
    await contract.deployed();
    console.log("Text contract deployed to:", contract.address);

    const [owner] = await ethers.getSigners();
    console.log("Testing with address:", owner.address);

    // Verify contract deployment
    const name = await contract.name();
    console.log("Contract name:", name);

    // Mint a new NFT
    console.log("Minting new text NFT...");
    const mintTx = await contract.mint(owner.address, "ipfs://text-test");
    console.log("Mint transaction submitted:", mintTx.hash);
    const receipt = await mintTx.wait();

    // Find the TokenMinted event
    const event = receipt.events?.find((e: any) => e.event === 'TokenMinted');
    if (!event || !event.args) {
      throw new Error("Failed to get TokenMinted event");
    }

    const tokenId = event.args.tokenId;
    console.log("Minted Text NFT with ID:", tokenId.toString());

    // Set text details
    console.log("Setting text details...");
    const detailsTx = await contract.setTextDetails(
      tokenId,
      "English",
      "Poetry",
      1000 // word count
    );
    await detailsTx.wait();

    // Verify details
    console.log("Verifying text details...");
    const metadata = await contract.getTextDetails(tokenId);
    console.log("Text Details:", {
      language: metadata.language,
      category: metadata.category,
      wordCount: metadata.wordCount.toString()
    });

    return true;
  } catch (error: unknown) {
    console.error("Text Extension Test Failed:", error);
    if ((error as any).receipt) {
      console.error("Transaction receipt:", (error as any).receipt);
    }
    return false;
  }
}

async function testVideoExtension() {
  console.log("\n=== Testing Video Extension ===");
  try {
    // Deploy a fresh instance
    const VideoFactory = await ethers.getContractFactory("ERC7007Video");
    const contract = await VideoFactory.deploy();
    await contract.deployed();
    console.log("Video contract deployed to:", contract.address);

    const [owner] = await ethers.getSigners();
    console.log("Testing with address:", owner.address);

    // Verify contract deployment
    const name = await contract.name();
    console.log("Contract name:", name);

    // Mint a new NFT
    console.log("Minting new video NFT...");
    const mintTx = await contract.mint(owner.address, "ipfs://video-test");
    console.log("Mint transaction submitted:", mintTx.hash);
    const receipt = await mintTx.wait();

    // Find the TokenMinted event
    const event = receipt.events?.find((e: any) => e.event === 'TokenMinted');
    if (!event || !event.args) {
      throw new Error("Failed to get TokenMinted event");
    }

    const tokenId = event.args.tokenId;
    console.log("Minted Video NFT with ID:", tokenId.toString());

    // Set video details
    console.log("Setting video details...");
    const detailsTx = await contract.setVideoDetails(
      tokenId,
      "1920x1080", // resolution
      180, // 3 minutes duration
      "H.264", // codec
      "video/mp4", // content type
      true, // has audio
      "CC BY 4.0" // license
    );
    await detailsTx.wait();

    // Verify details
    console.log("Verifying video details...");
    const metadata = await contract.getVideoDetails(tokenId);
    console.log("Video Details:", {
      resolution: metadata.resolution,
      duration: metadata.duration.toString(),
      codec: metadata.codec,
      contentType: metadata.contentType,
      hasAudio: metadata.hasAudio,
      license: metadata.license
    });

    return true;
  } catch (error: unknown) {
    console.error("Video Extension Test Failed:", error);
    if ((error as any).receipt) {
      console.error("Transaction receipt:", (error as any).receipt);
    }
    return false;
  }
}

async function testGameAssetExtension() {
  console.log("\n=== Testing Game Asset Extension ===");
  try {
    // Deploy a fresh instance
    const GameAssetFactory = await ethers.getContractFactory("ERC7007GameAsset");
    const contract = await GameAssetFactory.deploy();
    await contract.deployed();
    console.log("Game Asset contract deployed to:", contract.address);

    const [owner] = await ethers.getSigners();
    console.log("Testing with address:", owner.address);

    // Verify contract deployment
    const name = await contract.name();
    console.log("Contract name:", name);

    // Mint a new NFT
    console.log("Minting new game asset NFT...");
    const mintTx = await contract.mint(owner.address, "ipfs://game-asset-test");
    console.log("Mint transaction submitted:", mintTx.hash);
    const receipt = await mintTx.wait();

    // Find the TokenMinted event
    const event = receipt.events?.find((e: any) => e.event === 'TokenMinted');
    if (!event || !event.args) {
      throw new Error("Failed to get TokenMinted event");
    }

    const tokenId = event.args.tokenId;
    console.log("Minted Game Asset NFT with ID:", tokenId.toString());

    // Set game asset details
    console.log("Setting game asset details...");
    const detailsTx = await contract.setGameAssetDetails(
      tokenId,
      "Weapon",      // assetType
      "Legendary",   // rarity
      10,           // level
      [100, 50, 75], // stats (attack, defense, speed)
      ["Fire", "Legendary"], // attributes
      true,         // tradeable
      "1.0.0"       // gameVersion
    );
    await detailsTx.wait();

    // Verify details
    console.log("Verifying game asset details...");
    const details = await contract.getGameAssetDetails(tokenId);
    console.log("Game Asset Details:", {
      assetType: details[0],
      rarity: details[1],
      level: details[2].toString(),
      stats: details[3].map((stat: any) => stat.toString()),
      attributes: details[4],
      tradeable: details[5],
      gameVersion: details[6]
    });

    // Test updating stats
    console.log("\nTesting stat updates...");
    await contract.updateAssetStats(tokenId, [120, 60, 80]);
    const updatedDetails = await contract.getGameAssetDetails(tokenId);
    console.log("Updated stats:", updatedDetails[3].map((stat: any) => stat.toString()));

    return true;
  } catch (error: unknown) {
    console.error("Game Asset Extension Test Failed:", error);
    if ((error as any).receipt) {
      console.error("Transaction receipt:", (error as any).receipt);
    }
    return false;
  }
}

async function main() {
  console.log("Starting Extension Tests...\n");

  const artResult = await testArtExtension();
  const musicResult = await testMusicExtension();
  const textResult = await testTextExtension();
  const videoResult = await testVideoExtension();
  const gameAssetResult = await testGameAssetExtension();

  console.log("\n=== Test Results ===");
  console.log(`Art Extension: ${artResult ? "✅ Passed" : "❌ Failed"}`);
  console.log(`Music Extension: ${musicResult ? "✅ Passed" : "❌ Failed"}`);
  console.log(`Text Extension: ${textResult ? "✅ Passed" : "❌ Failed"}`);
  console.log(`Video Extension: ${videoResult ? "✅ Passed" : "❌ Failed"}`);
  console.log(`Game Asset Extension: ${gameAssetResult ? "✅ Passed" : "❌ Failed"}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Test execution failed:", error);
    process.exit(1);
  });