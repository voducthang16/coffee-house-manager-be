var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const User = new Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    area: { type: String, require: true },
    role: { type: Number, default: 2 },
    status: { type: Number, default: 0 },
}, {
    timestamps: true,
})

module.exports = mongoose.model('User', User);