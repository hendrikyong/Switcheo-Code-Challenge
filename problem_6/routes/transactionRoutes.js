const express = require("express");
const router = express.Router();
const { handleTransactionRequest, getAllTransactionsHandler } = require("../controllers/transactionController");

router.post("/transaction/broadcast", handleTransactionRequest);
router.get("/transactions", getAllTransactionsHandler);

module.exports = router;
