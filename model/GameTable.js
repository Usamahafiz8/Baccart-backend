// models/gameTable.js
const mongoose = require("mongoose");

const gameTableSchema = new mongoose.Schema({
  table_ID: { type: String, required: true },
  total_Investor_Seats: { type: String },
  investor_Cer_Seats_Cost: { type: String },
  winners_Rewards: { type: Number, default: 0 },
  bet_Size: { type: String },
  Bankers_Address: { type: String },
  gamers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Gamer' }],
  investors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Investor' }],
  status: { type: String, default: 'active' } 
});

const ContractGameTable = mongoose.model("gameTable", gameTableSchema);

module.exports = ContractGameTable;
