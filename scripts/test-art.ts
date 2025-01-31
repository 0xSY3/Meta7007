import { ethers } from "hardhat";

async function main() {
  console.log("Testing ERC7007Art Extension...");

  // Get the contract instance at the deployed address
  const artContract = await ethers.getContractAt(
    "ERC7007Art",
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  );

  // Get a signer for transactions
  const [owner] = await ethers.getSigners();
  console.log("Testing with address:", owner.address);

  try {
    // Mint a new art NFT
    console.log("\nMinting new art NFT...");
    const tx = await artContract.mint(owner.address, "ipfs://example-art-uri");
    const receipt = await tx.wait();
    const mintEvent = receipt.events?.find(e => e.event === 'TokenMinted');
    const tokenId = mintEvent?.args?.tokenId;
    console.log("Minted NFT with ID:", tokenId.toString());

    // Set artwork details
    console.log("\nSetting artwork details...");
    await artContract.setArtworkDetails(
      tokenId,
      "2000x3000",  // dimensions
      "Oil on canvas"  // medium
    );
    console.log("Artwork details set successfully");

    // Get and verify artwork details
    console.log("\nRetrieving artwork details...");
    const [dimensions, medium] = await artContract.getArtworkDetails(tokenId);
    console.log("Artwork Dimensions:", dimensions);
    console.log("Artwork Medium:", medium);

    console.log("\nArt Extension test completed successfully!");
  } catch (error) {
    console.error("Error during testing:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
