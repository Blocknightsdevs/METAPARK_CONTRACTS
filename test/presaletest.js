const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MPARKToken", function () {

  it("Should create token with desired supply and mint to creator", async function () {    
    const accounts = await ethers.getSigners()
    const account = await accounts[0].getAddress()
    const MPARKToken = await ethers.getContractFactory("MPARKToken");
    let totalSupply = "100000000000000000000000000000"; //100BN TOKENS blockdemyToken
    const mPARKToken = await MPARKToken.deploy(totalSupply);
    let supply = await mPARKToken.totalSupply();
    expect(supply).to.equal("100000000000000000000000000000"); //contract supply is 100BN
    let balanceOfDeployer = await mPARKToken.balanceOf(account);
    expect(balanceOfDeployer).to.equal("100000000000000000000000000000"); //deployer has 100BN
    
  });


  /*it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });*/
});
