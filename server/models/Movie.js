const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  watchedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

module.exports = mongoose.model("Movie", movieSchema);
