const express = require("express");
const bodyParser = require("body-parser");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Use the transaction routes
app.use(transactionRoutes);

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
