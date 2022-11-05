const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new Schema({
    name: { type: String, require: true },
    price: { type: Number, require: true },
    image: {type: String, require: true},
    status: { type: Number, default: 0 },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Product', Product);