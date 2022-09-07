const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	mobileNo: { type: String, required: true, unique: true },
	isAdmin: { type: Boolean, default: false },
	orders: [{
		type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true
	}]
},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
