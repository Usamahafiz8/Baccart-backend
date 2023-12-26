// models/gamer.js
const mongoose = require("mongoose");

const gamerSchema = new mongoose.Schema({
  gamer_Address: { type: String, required: true },
  betInformation: {
    win_or_lose: { type: String },
    betOn: { type: String, enum: ["player", "banker", "tie"], required: true },
    table_ID: { type: mongoose.Schema.Types.ObjectId, ref: 'gameTable' },
    startDate: { type: Date, default: Date.now },
    endDate:{ type: Date, default: Date.now },
    
  },
});

const Gamer = mongoose.model("Gamer", gamerSchema);

module.exports = Gamer;