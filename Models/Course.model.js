var mongoose = require('mongoose')

var courseSchema = new mongoose.Schema({
    courseName: { type: String }
});

courseSchema.set('autoIndex', false);

module.exports = mongoose.model('course', courseSchema);

