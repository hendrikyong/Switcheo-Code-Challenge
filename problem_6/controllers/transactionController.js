const {
  broadcastTransaction,
  getAllTransactions,
} = require("../models/transactionModel");

async function handleTransactionRequest(req, res) {
  const { from, to, value, gas, privateKey } = req.body;

  // Validate request parameters
  if (!from || !to || !value || !gas || !privateKey) {
    return res
      .status(400)
      .json({ success: false, error: "Missing required fields" });
  }

  try {
    // Broadcast the transaction
    const receipt = await broadcastTransaction({
      from,
      to,
      value,
      gas,
      privateKey,
    });

    // Return successful transaction receipt
    res.json({ success: true, receipt });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

function getAllTransactionsHandler(req, res) {
  try {
    const transactions = getAllTransactions(); //fetch all transactions
    const successTransactions = transactions.filter(tx => tx.status === true);
    const failedTransactions = transactions.filter(tx => tx.status === false); 

    res.json({
      success: true,
      successTransactions, // Return successful transactions
      failedTransactions, // Return failed transactions
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch transactions" });
  }
}


module.exports = { handleTransactionRequest, getAllTransactionsHandler };
