import { expect } from "chai";
import { ethers } from "hardhat";
import { PixelDAO } from "../typechain";

describe("PixelDAO", function () {
  let pixeldao: PixelDAO;

  this.beforeEach(async function () {
    const PixelFactory = await ethers.getContractFactory("PixelDAO");
    pixeldao = await PixelFactory.deploy();
    await pixeldao.deployed();
  });

  describe("upon deployment", function () {
    it("should have a member count of one", async function () {
      expect(await pixeldao.memberCount()).to.equal(1);
    });

    it("should have a member named `The President` ", async function () {
      expect(
        await (
          await pixeldao.searchMemberList(await pixeldao.addressList(0))
        ).name
      ).to.equal("The President");
    });
  });
});
