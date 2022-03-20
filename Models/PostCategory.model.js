var mongoose = require('mongoose')

var categorySchema = new mongoose.Schema({
    categoryName: { type: String },

});

categorySchema.set('autoIndex', false);

module.exports = mongoose.model('postCategory', categorySchema);