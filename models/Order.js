const mongoose = require("mongoose");
const Product = require("./Product");

const orderSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
	product: [{
		productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
		quantity: { type: Number, default: 1 }
	}],
	totalAmount: { type: Number, required: true },
	shippingAddress: { type: String, required: true },
	purchasedOn: {  type: Date, default: new Date() }
},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

