const Web3 = require('web3');

const web3 = new Web3("http://localhost:8545");

const broadcastTransaction = async ({ from, to, value, gas, privateKey }) => {
  try {
    //console.log("Web3 instance:", web3);
    //console.log("Web3 Version:", web3.version);

    const valueInWei = web3.utils.toWei(value.toString(), "ether"); // Convert to Wei

    const tx = {
      from,
      to,
      value: valueInWei,
      gas,
    };

    //sign the transaction
    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

    //send the signed transaction
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

    console.log("Transaction receipt:", receipt);
    return receipt; // Return the transaction receipt
  } catch (error) {
    throw new Error("Failed to broadcast transaction: " + error.message);
  }
};

module.exports = { broadcastTransaction };
