const AdminModel = require('../Models/Admin.model')
const postModel = require('../Models/Feed.model')
module.exports = {

    async login(req, res) {
        console.log(req.body)
        AdminModel.findOne({ email: req.body.userId })
            .then(result => {
                console.log(result);
                if (result == null)
                    res.status(200).json({ "message": "Admin not found Please login" });
                else {
                    res.status(200).json({ 'message': 'Login successfull', 'token': result.generateJwt() });
                }
            })
            .catch(err => { console.log(err) })
    },

    async addAdmin(req, res) {
        var admin = new AdminModel();
        admin = req.body;
        console.log(admin);
        AdminModel.create(admin)
            .then(result => {
                res.status(200).json({ message: 'Admin added successfully !', result });
            })
            .catch(err => { console.log(err); });
    },

    async getAdmins(req, res) {
        AdminModel.find({})
            .populate('channelList')
            .populate('collegeId', '-departments')
            .populate('DeptId')
            .populate('courseId')
            .select("-password")
            .select("-saltSecret")
            .then(data => {
                res.status(200).json({ message: 'Volunteers fetchged successfully', data })
            })
            .catch(err => { console.log(err); });
    },

    async publishPost(req, res) {
        console.log(req.body)
        let post = new postModel();
        post = req.body;
        post.createdAt = new Date();
        postModel.create(post)
            .then(result => {
                AdminModel.updateOne({ _id: result.postedBy },
                    {
                        $push: { postsId: result._id }
                    }).then(result => {
                        //console.log(result);
                    }).catch(error => { console.log(error) });
                res.status(200).json({ message: 'Post added successfully !', result });
            })
            .catch(err => { console.log(err); });
    }

};