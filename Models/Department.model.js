var mongoose = require('mongoose')

var deptSchema = new mongoose.Schema({

    deptName: { type: String },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'course' },
    collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'college' }

});

deptSchema.set('autoIndex', false);

module.exports = mongoose.model('department', deptSchema);