var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Task = new Schema({
    projectId: { type: Schema.Types.ObjectId, require: true, ref: 'Project'},
    name: { type: String, require: true },
    describe: { type: String, require: true },
    memberId: { type: Schema.Types.ObjectId, require: true, ref: 'User'},
    priority: { type: Number, require: true},
    status: { type: Number, default: 0 },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Task', Task);