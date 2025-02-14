const { broadcastTransaction } = require('../models/transactionModel');

async function handleTransactionRequest(req, res) {
  const { from, to, value, gas, privateKey } = req.body; // Assuming the transaction details are in the request body

  try {
    // Call the model function to broadcast the transaction
    const receipt = await broadcastTransaction({ from, to, value, gas, privateKey });

    // Send successful response with transaction receipt
    res.json({ success: true, receipt });
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ success: false, error: error.message });
  }
}

module.exports = { handleTransactionRequest };
