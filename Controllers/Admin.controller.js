const AdminModel = require('../Models/Admin.model')
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
    }

}