import { ethers } from "hardhat";

async function main() {
    console.log("Deploying ERC7007 contracts...");

    // Deploy extensions
    const ERC7007Art = await ethers.getContractFactory("ERC7007Art");
    const art = await ERC7007Art.deploy();
    await art.deployed();
    console.log("ERC7007Art deployed to:", art.address);

    const ERC7007Music = await ethers.getContractFactory("ERC7007Music");
    const music = await ERC7007Music.deploy();
    await music.deployed();
    console.log("ERC7007Music deployed to:", music.address);

    const ERC7007Text = await ethers.getContractFactory("ERC7007Text");
    const text = await ERC7007Text.deploy();
    await text.deployed();
    console.log("ERC7007Text deployed to:", text.address);

    const ERC7007Video = await ethers.getContractFactory("ERC7007Video");
    const video = await ERC7007Video.deploy();
    await video.deployed();
    console.log("ERC7007Video deployed to:", video.address);

    const ERC7007GameAsset = await ethers.getContractFactory("ERC7007GameAsset");
    const gameAsset = await ERC7007GameAsset.deploy();
    await gameAsset.deployed();
    console.log("ERC7007GameAsset deployed to:", gameAsset.address);

    console.log("\nDeployment complete!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });