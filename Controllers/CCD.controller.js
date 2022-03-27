// Course-College-Category-Department Controller file
const collegeModel = require('../Models/College.model')
const CourseModel = require('../Models/Course.model');
const DepartmentModel = require('../Models/Department.model');
const catModel = require('../Models/PostCategory.model')
module.exports = {
    async addCourse(req, res) {
        var course = new CourseModel();
        course.courseName = req.body.courseName;
        course.save()
            .then(success => {
                res.status(200).json({ 'message': "Course added Successfully", success })
            })
            .catch(err => { console.log(err) });
    },

    async addCollege(req, res) {
        var college = new collegeModel();
        college.collegeName = req.body.collegeName;
        college.courseId = req.body.courseId;
        college.departments = req.body.departments;
        college.save()
            .then(success => {
                res.status(200).json({ 'message': "College added Successfully", success })
            })
            .catch(err => { console.log(err) });
    },

    async addDepartment(req, res) {
        var dept = new DepartmentModel();
        dept.deptName = req.body.courseName;
        dept.save()
            .then(success => {
                res.status(200).json({ 'message': "Department added Successfully", success })
            })
            .catch(err => { console.log(err) });

    },
    async fetchCollges(req, res) {
        collegeModel.find()
            .populate("courseId")
            .populate("departments")
            .then(colleges => {
                res.status(200).json({ 'message': "colleges fetched", colleges })
            })
            .catch(err => { console.log(err) });
    },

    async addCategory(req, res) {
        catModel.insertMany(req.body)
            .then(result => {
                res.status(200).json({ 'message': 'Category Added Successfully', result })
            })
            .catch(err => { console.log(err) });
    }

};