const mongoose = require('mongoose')

var roleSchema = new mongoose.Schema({
    roleName: { type: 'string' }
});

roleSchema.set('autoIndex', false);

module.exports = mongoose.model('role', roleSchema);