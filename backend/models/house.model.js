const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
  houseName: { type: String, required: true },

  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: Number, required: true },
  houseType: { type: String },
  price: { type: Number, required: true },
  description: { type: String, required: false },
  restrictions: [{ type: String }],
  facilities: [{ type: String }],
  images: [{ type: String, required: true }],
  videos: [{ type: String, required: false }],
});

const House = mongoose.model("House",houseSchema);

module.exports = House;
