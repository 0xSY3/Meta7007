
import { ethers } from "hardhat";
import { expect } from 'chai';
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("ERC7007 Extensions", function () {
    let ArtContract: any;
    let MusicContract: any;
    let TextContract: any;
    let VideoContract: any;
    let GameAssetContract: any;
    let art: Contract;
    let music: Contract;
    let text: Contract;
    let video: Contract;
    let gameAsset: Contract;
    let owner: SignerWithAddress;
    let addr1: SignerWithAddress;
    let addr2: SignerWithAddress;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();

        ArtContract = await ethers.getContractFactory("ERC7007Art");
        MusicContract = await ethers.getContractFactory("ERC7007Music");
        TextContract = await ethers.getContractFactory("ERC7007Text");
        VideoContract = await ethers.getContractFactory("ERC7007Video");
        GameAssetContract = await ethers.getContractFactory("ERC7007GameAsset");

        art = await ArtContract.deploy();
        music = await MusicContract.deploy();
        text = await TextContract.deploy();
        video = await VideoContract.deploy();
        gameAsset = await GameAssetContract.deploy();

        await Promise.all([
            art.deployed(),
            music.deployed(),
            text.deployed(),
            video.deployed(),
            gameAsset.deployed()
        ]);
    });

    describe("Art Extension", function () {
        it("Should set and get artwork details", async function () {
            await art.mint(addr1.address, "ipfs://art");
            await art.setArtworkDetails(1, "100x100", "Oil on canvas");

            const details = await art.getArtworkDetails(1);
            expect(details[0]).to.equal("100x100");
            expect(details[1]).to.equal("Oil on canvas");
        });
    });

    describe("Music Extension", function () {
        it("Should set and get music details", async function () {
            await music.mint(addr1.address, "ipfs://music");
            await music.setMusicDetails(1, "Jazz", 180, "CC-BY-SA");

            const details = await music.getMusicDetails(1);
            expect(details.genre).to.equal("Jazz");
            expect(details.duration.toNumber()).to.equal(180);
            expect(details.license).to.equal("CC-BY-SA");
        });
    });

    describe("Text Extension", function () {
        it("Should set and get text details", async function () {
            await text.mint(addr1.address, "ipfs://text");
            await text.setTextDetails(1, "English", "Poetry", 100);

            const details = await text.getTextDetails(1);
            expect(details.language).to.equal("English");
            expect(details.category).to.equal("Poetry");
            expect(details.wordCount.toNumber()).to.equal(100);
        });
    });

    describe("Video Extension", function () {
        it("Should set and get video details", async function () {
            await video.mint(addr1.address, "ipfs://video");
            await video.setVideoDetails(
                1,
                "1920x1080",
                300,
                "H.264",
                "video/mp4",
                true,
                "CC-BY-4.0"
            );

            const details = await video.getVideoDetails(1);
            expect(details.resolution).to.equal("1920x1080");
            expect(details.duration.toNumber()).to.equal(300);
            expect(details.codec).to.equal("H.264");
            expect(details.contentType).to.equal("video/mp4");
            expect(details.hasAudio).to.equal(true);
            expect(details.license).to.equal("CC-BY-4.0");
        });
    });

    describe("GameAsset Extension", function () {
        const defaultStats = [100, 50, 75];
        const defaultAttributes = ["Fire", "Legendary", "Unique"];

        it("Should set and get game asset details", async function () {
            await gameAsset.mint(addr1.address, "ipfs://game-asset");
            await gameAsset.setGameAssetDetails(
                1,
                "Weapon",
                "Legendary",
                10,
                defaultStats,
                defaultAttributes,
                true,
                "1.0.0"
            );

            const [assetType, rarity, level, stats, attributes, tradeable, gameVersion] =
                await gameAsset.getGameAssetDetails(1);

            expect(assetType).to.equal("Weapon");
            expect(rarity).to.equal("Legendary");
            expect(level.toNumber()).to.equal(10);
            expect(stats.map(s => s.toNumber())).to.deep.equal(defaultStats);
            expect(attributes).to.deep.equal(defaultAttributes);
            expect(tradeable).to.equal(true);
            expect(gameVersion).to.equal("1.0.0");
        });

        it("Should update game asset stats", async function () {
            await gameAsset.mint(addr1.address, "ipfs://game-asset");
            await gameAsset.setGameAssetDetails(
                1,
                "Weapon",
                "Legendary",
                10,
                defaultStats,
                defaultAttributes,
                true,
                "1.0.0"
            );

            const newStats = [150, 75, 100];
            await gameAsset.updateAssetStats(1, newStats);

            const [,,, stats] = await gameAsset.getGameAssetDetails(1);
            expect(stats.map(s => s.toNumber())).to.deep.equal(newStats);
        });

        it("Should fail when non-creator tries to update game asset", async function () {
            await gameAsset.mint(addr1.address, "ipfs://game-asset");
            await gameAsset.setGameAssetDetails(
                1,
                "Weapon",
                "Legendary",
                10,
                defaultStats,
                defaultAttributes,
                true,
                "1.0.0"
            );

            await expect(
                gameAsset.connect(addr1).updateAssetLevel(1, 20)
            ).to.be.revertedWith("ERC7007GameAsset: Only creator can update level");
        });
    });
});
