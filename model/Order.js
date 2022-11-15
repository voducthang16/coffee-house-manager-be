const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    cashier: { type: String, require: true },
    tableId: { type: Number, required: false },
    productId: { type: Schema.Types.ObjectId, require: true, ref: 'Product' },
    quantity:  { type: Number, require: true },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Order', Order);