var mongoose = require('mongoose')

var collegeSchema = new mongoose.Schema({
    collegeName: { type: String },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'course' },
    departments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'department' }]

});

collegeSchema.set('autoIndex', false);

module.exports = mongoose.model('college', collegeSchema);