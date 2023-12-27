
const mongoose = require("mongoose");

const investorSchema = new mongoose.Schema({
  investor_Address:  { type: String, required: true },
  investor_Shares: { type: Number },
  per_Share_Cost: { type: Number },
  total_investment: { type: Number },
  table_id: { type: mongoose.Schema.Types.ObjectId, ref: 'gameTable' },
});

const Investor = mongoose.model("Investor", investorSchema);

module.exports = Investor;
