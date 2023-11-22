const express = require('express');
const walletRoutes = require('./routes/walletRoutes');
const WalletBalance =  require('./routes/walletBalanceRoute')
const TransactionRoutes = require('./routes/transectionRoutes')
const TransactionHistoryRoutes = require('./routes/transectionHistoryRoute')
const swaggerMiddleware = require('./middlewares/swaggerMiddleware');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(cors());


// Use Swagger middleware
swaggerMiddleware(app);

// Routes
app.use('/wallet', walletRoutes);
app.use('/balance', WalletBalance )
app.use('/transactions', TransactionRoutes);
app.use('/transactionsHistory', TransactionHistoryRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});