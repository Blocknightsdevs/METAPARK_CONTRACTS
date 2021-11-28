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
  const contractAddress = "0x86A2EE8FAf9A840F7a2c64CA3d51209F9A02081D";
  const presaleContract = await hre.ethers.getContractAt("Presale", contractAddress);


  let minBuy = web3.utils.toWei('0.1', 'ether');
  let maxBuy = web3.utils.toWei('2', 'ether')
  let softCap = web3.utils.toWei('0.1', 'ether')
  let hardCap = web3.utils.toWei('20', 'ether')
  
  /*let balance = await presaleContract.getEndDate();
  console.log(balance);*/
  await presaleContract.startICO("1638130241",minBuy,maxBuy,softCap,hardCap,{from:account});


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
