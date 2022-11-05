var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Project = new Schema({
    name: { type: String, require: true },
    leader: { type: Schema.Types.ObjectId, require: true, ref: 'User'},
    members: { type: Array, require: true, ref: 'User'},
    price: { type: Number, require: true },
    startDate: { type: String, require: true },
    endDate: { type: String, require: true },
    status: { type: Number, default: 0 },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Project', Project);