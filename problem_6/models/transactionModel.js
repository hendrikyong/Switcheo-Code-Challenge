const Web3 = require("web3");

const web3 = new Web3("http://localhost:8545");

let transactions = [];
const retries = 2;
const delay = 5000;

//function for retry
const delayExecution = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

//function to broadcast transaction w retries
const broadcastTransaction = async ({ from, to, value, gas, privateKey }) => {
  let attempt = 0;

  // Function to validate addresses
  const validateAddresses = () => {
    if (!web3.utils.isAddress(from) || !web3.utils.isAddress(to)) {
      const errorMsg = "Provided address is invalid.";
      console.error(errorMsg);
      transactions.push({
        transactionHash: "N/A",
        status: false,
        from,
        to,
        gasUsed: 0,
        error: errorMsg,
        timestamp: new Date(),
      });
      return false; //return false to indicate invalid address
    }
    return true;
  };

  //retry loop for broadcasting transaction
  while (attempt < retries) {
    console.log(`Attempt ${attempt + 1} of ${retries}`);

    if (!validateAddresses()) {
      console.log(`Retrying in ${delay / 1000} seconds...`);
      await delayExecution(delay);
      attempt++;
      if (attempt === retries) {
        console.log("Transaction failed after retries.");
        transactions.push({
          transactionHash: "N/A",
          status: false,
          from,
          to,
          gasUsed: 0,
          error: "Error in broadcasting transaction.",
          timestamp: new Date(),
        });
        throw new Error("Transaction failed.");
      }
      continue; // Retry after waiting
    }

    try {
      //prepare the transaction
      const valueInWei = web3.utils.toWei(value.toString(), "ether");
      const tx = { from, to, value: valueInWei, gas };

      //sign the transaction
      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);

      const receipt = await Promise.race([
        web3.eth.sendSignedTransaction(signedTx.rawTransaction),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("RPC timeout exceeded 30s")), 30000)
        ),
      ]);

      console.log("Transaction succeeded:", receipt);

      //log success details
      transactions.push({
        transactionHash: receipt.transactionHash,
        status: receipt.status,
        from,
        to,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed,
        timestamp: new Date(),
      });

      return receipt;
    } catch (error) {
      attempt++;
      console.error(`Attempt ${attempt} failed: ${error.message}`);

      if (attempt === retries) {
        console.log("Transaction failed after retries.");
        transactions.push({
          transactionHash: "N/A",
          status: false,
          from,
          to,
          gasUsed: 0,
          error: error.message,
          timestamp: new Date(),
        });
        throw new Error("Transaction failed after retries.");
      } else {
        console.log(`Retrying in ${delay / 1000} seconds...`);
        await delayExecution(delay);
      }
    }
  }
};

// Function to get all transactions
const getAllTransactions = () => transactions;

module.exports = { broadcastTransaction, getAllTransactions };
