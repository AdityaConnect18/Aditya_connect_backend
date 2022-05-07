const mongoose = require('mongoose')

var messageSchema = new mongoose.Schema({
    message: { type: 'string' },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    createdAt: { type: Date }
});

messageSchema.set('autoIndex', false);

module.exports = mongoose.model('message', messageSchema);