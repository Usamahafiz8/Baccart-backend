const express = require('express');
const walletRoutes = require('./routes/walletRoutes');
const WalletBalance =  require('./routes/walletBalanceRoute')
const TransactionRoutes = require('./routes/transectionRoutes')
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});