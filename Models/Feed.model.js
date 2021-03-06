var mongoose = require('mongoose')

var postSchema = new mongoose.Schema({

    postTitle: { type: String },
    postMessage: { type: String },
    categoryId: { type: mongoose.Schema.ObjectId, ref: 'postCategory' },
    channelList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'college' }],
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'admin' },
    createdAt: { type: Date, default: Date.now() },
    mediaId: { type: String, default: '' },
    likedUsersList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
});

postSchema.set('autoIndex', false);

module.exports = mongoose.model('post', postSchema);




