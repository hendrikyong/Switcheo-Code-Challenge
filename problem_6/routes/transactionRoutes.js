const express = require("express");
const router = express.Router();
const { broadcastTransaction } = require("../models/transactionModel"); // Import your function

// Define the route correctly
router.post("/transaction/broadcast", async (req, res) => {
  try {
    const { from, to, value, gas, privateKey } = req.body;
    const receipt = await broadcastTransaction({
      from,
      to,
      value,
      gas,
      privateKey,
    });
    res.status(200).json(receipt); // Return the transaction receipt as JSON
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
