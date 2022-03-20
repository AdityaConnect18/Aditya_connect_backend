// Course-College-Department Controller file
const courseModel = require('../Models/Course.model')
const collegeModel = require('../Models/College.model')
const deptModel = require('../Models/Department.model');
const CourseModel = require('../Models/Course.model');

module.exports = {
    async addCourse(req, res) {
        var course = new CourseModel();
        course.courseName = req.body.name;
        course.save()
            .then(success => { console.log(success) })
            .catch(err => { console.log(err) });
    },

    async addCollege(req, res) {
        var college = new collegeModel();
        college.collegeName = req.body.name;
        college.courseId = req.body.courseId;
        college.save()
            .then(success => { console.log(success) })
            .catch(err => { console.log(err) });
    },

    async addDepartment(req, res) {
        var dept = new Department();
        dept.deptName = req.body.deptName;
        dept.courseId = req.body.courseId;
        dept.collegeId = req.body.collegeId;
        dept.save()
            .then(success => { console.log(success) })
            .catch(err => { console.log(err) });

    }

};