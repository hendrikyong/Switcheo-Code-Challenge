const express = require("express");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

app.use(express.json()); 

app.use(transactionRoutes);

//handle 404 errors for undefined routes
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ success: false, error: "Internal Server Error" });
});

//start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
