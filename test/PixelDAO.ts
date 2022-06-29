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

  describe("once a second member is added", function () {
    this.beforeEach(async function () {
      await pixeldao.addMember(
        "Coltrane",
        "white",
        "blue",
        "0101010101",
        "0x18e8212693220A2040cCFAC0CA45249E54D83b90"
      );
    });

    it("should have a member count of size 2", async function () {
      expect(await pixeldao.memberCount()).to.equal(2);
    });

    it("should have a second member of colourTwo equal to blue", async function () {
      expect(
        await (
          await pixeldao.searchMemberList(await pixeldao.addressList(1))
        ).colourTwo
      ).to.equal("blue");
    });
  });
});
