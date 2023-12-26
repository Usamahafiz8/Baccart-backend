
const mongoose = require("mongoose");

const investorSchema = new mongoose.Schema({
  investor_Investment: { type: String },
  table_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'gameTable' }
});

const Investor = mongoose.model("Investor", investorSchema);

module.exports = Investor;
