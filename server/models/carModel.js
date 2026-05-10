const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const carSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true },
    price: { type: Number, required: true },
    year: { type: String, required: true },
    city: { type: String, required: true },
    kilometers: { type: Number, required: true },
    engine: { type: String, required: true },
    color: { type: String, required: true },
    gearbox: { type: String, required: true },
    horsepowers: { type: Number, required: true },
    doors: { type: Number, required: true },
    firstImageUrl: { type: String, required: true },
    secondImageUrl: { type: String, required: true },
    userId: { type: ObjectId, ref: "User", required: true },
}, { timestamps: true }); // Automatically handles created_at and updatedAt

module.exports = mongoose.model('Car', carSchema);
