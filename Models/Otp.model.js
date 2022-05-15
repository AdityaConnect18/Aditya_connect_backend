const mongoose = require('mongoose')

var otpSchema = new mongoose.Schema({
    userEmail: { type: String },
    otp: { type: String }
});

otpSchema.set('autoIndex', false);

module.exports = mongoose.model('otp', otpSchema);