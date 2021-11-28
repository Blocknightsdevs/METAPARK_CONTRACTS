// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const accounts = await ethers.getSigners()
  const account = await accounts[0].getAddress()

  // We get the contract to deploy
  const MPARKToken = await hre.ethers.getContractFactory("MPARKToken");
  let totalSupply = "100000000000000000000000000000"; //100BN TOKENS blockdemyToken
  const mPARKToken = await MPARKToken.deploy(totalSupply);

  await mPARKToken.deployed();
  
  const Presale = await hre.ethers.getContractFactory("Presale");
  const presale = await Presale.deploy(1000,account,mPARKToken.address,18);
  
  await presale.deployed();
  //send 25% to presale, we can get the supply and mul by 0.25 later (40BN), we will send 50% to play to earn
  await mPARKToken.approve(account,"25000000000000000000000000000")
  await mPARKToken.transferFrom(account,presale.address,"25000000000000000000000000000");

  console.log("MPARKToken deployed to:", mPARKToken.address);
  console.log("presale deployed to:", presale.address);

  let balanceOfPresale = await mPARKToken.balanceOf(presale.address);
  console.log(balanceOfPresale.toString());


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
