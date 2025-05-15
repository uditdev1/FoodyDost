import mongoose from "mongoose";

export const searchHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref : "userModel" , required: true },
  searchTerm: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
}); 

export const SearchHistory = mongoose.model('SearchHistory', searchHistorySchema);