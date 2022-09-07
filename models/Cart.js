const mongoose = require("mongoose");
const Product = require("./Product");
const User = require("./User");

const cartSchema = new mongoose.Schema({
        userId: { type: mongoose.Schema.Types.ObjectId, required: true },
        products: [{
                productId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Product', required: true
                },
                quantity: { type: Number, default: 1 }
        }]

})

module.exports = mongoose.model("Cart", cartSchema);
