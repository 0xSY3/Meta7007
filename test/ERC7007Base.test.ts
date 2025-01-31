
import { ethers } from "hardhat";
import { expect } from 'chai';
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("ERC7007Base", function () {
    let ERC7007Base: any;
    let contract: Contract;
    let owner: SignerWithAddress;
    let addr1: SignerWithAddress;
    let addr2: SignerWithAddress;

    beforeEach(async function () {
        ERC7007Base = await ethers.getContractFactory("ERC7007Base");
        [owner, addr1, addr2] = await ethers.getSigners();
        contract = await ERC7007Base.deploy();
        await contract.deployed();
    });

    describe("Minting", function () {
        it("Should mint a new token", async function () {
            const tokenURI = "ipfs://test";
            await expect(contract.mint(addr1.address, tokenURI))
                .to.emit(contract, "TokenMinted")
                .withArgs(1, owner.address, tokenURI);

            const creator = await contract.creatorOf(1);
            const uri = await contract.tokenURI(1);
            expect(creator).to.equal(owner.address);
            expect(uri).to.equal(tokenURI);
        });

        it("Should fail when minting to zero address", async function () {
            await expect(
                contract.mint(ethers.constants.AddressZero, "ipfs://test")
            ).to.be.revertedWith("ERC7007: mint to zero address");
        });
    });

    describe("Metadata", function () {
        it("Should update metadata", async function () {
            await contract.mint(addr1.address, "ipfs://old");
            const newURI = "ipfs://new";

            await expect(contract.updateMetadata(1, newURI))
                .to.emit(contract, "MetadataUpdated")
                .withArgs(1, newURI);

            expect(await contract.tokenURI(1)).to.equal(newURI);
        });

        it("Should fail when non-creator updates metadata", async function () {
            await contract.mint(addr1.address, "ipfs://test");
            await expect(
                contract.connect(addr1).updateMetadata(1, "ipfs://new")
            ).to.be.revertedWith("ERC7007: Only creator can update metadata");
        });
    });
});
