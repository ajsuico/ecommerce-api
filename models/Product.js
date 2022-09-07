const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	owner: { type: String, required: true },
	price: { type: Number, required: true },
	isActive: { type: Boolean, default: true },
	createdOn: {  type: Date, default: new Date() },
	orders: [{
		type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true
	}]

},
	{ timestamps: true }
);


module.exports = mongoose.model("Product", productSchema);
