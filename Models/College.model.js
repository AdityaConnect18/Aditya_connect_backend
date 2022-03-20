var mongoose = require('mongoose')

var collegeSchema = new mongoose.Schema({
    collegeName: { type: String },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'course' },

});

collegeSchema.set('autoIndex', false);

module.exports = mongoose.model('college', collegeSchema);