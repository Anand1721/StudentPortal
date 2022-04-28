const express = require('express')
const TeacherBasicDetail = require('../../models/teacher/basic-details')
const TeacherOtherDetail = require('../../models/teacher/other-details')
const AboutTeacher = require('../../models/teacher/about-teacher')
const TeacherProfile = require('../../models/teacher/teacher-profile')
const Classroom = require('../../models/classroom/classroom')
const Member = require('../../models/classroom/members')
const Task = require('../../models/classroom/tasks')
const multer = require('multer')
const Submission = require('../../models/classroom/submissions')
const studentAuth = require('../../middleware/auth-student')
const router = new express.Router()

router.post('/student/join-classroom', studentAuth, async (req, res) => {
    try {
        const check = await Classroom.find({ Code: req.body.Code })
        if (!check) {
            throw new Error("No such classroom!")
        }
        const Username = req.student.username
        const member = await new Member({ Code: req.body.Code, Username, Usertype: 'student', userID: req.student._id })
        await member.save()
        const tasks = await Task.find({ Code: req.body.Code })
        tasks.forEach(async (task) => {
            const submissions = await new Submission({ Code: req.body.Code, TaskCode: task.TaskCode, Username, Usertype: 'student', SubmissionStatus: 'false', userID: req.student._id })
            await submissions.save()
        })
        res.status(200).send(member)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.get('/student/get-classroom-codes', studentAuth, async (req, res) => {
    try {
        const members = await Member.find({ userID: req.student._id })
        const Codes = []
        members.forEach((member) => {
            Codes.push(member.Code)
        })
        res.status(200).send(Codes)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/student/get-classrooms', studentAuth, async (req, res) => {
    try {
        const Codes = req.body.Codes
        const classData = async (Codes) => {
            const classroomData = []
            for (const Code of Codes) {
                const classroom = await Classroom.findOne({ Code })
                classroomData.push(classroom)
            }
            return classroomData
        }
        const classroomData = await classData(Codes)
        res.status(200).send(classroomData)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/student/:Code/members', studentAuth, async (req, res) => {
    try {
        const Code = req.params.Code
        const members = await Member.find({ Code })
        res.status(200).send(members)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/student/:Code/get-tasks', studentAuth, async (req, res) => {
    try {
        const Code = req.params.Code
        const tasks = await Task.find({ Code })
        res.status(200).send(tasks)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

const upload = multer({
    fileFilter (req, file, cb) {
        if (!file.originalname.match(/\.(pdf)$/)) {
            return cb(new Error("Please upload a pdf file!"))
        }
        cb(undefined, true)
    }
})

router.patch('/student/add-assignment/:TaskCode/:filename', studentAuth, upload.single('Submission'), async (req, res) => {
    try {
        const TaskCode = req.params.TaskCode
        const filename = req.params.filename
        buffer = req.file.buffer
        const submissions = await Submission.findOne({ TaskCode, userID: req.student._id })
        console.log(submissions)
        submissions['SubmissionName'] = filename
        submissions['Submission'] = buffer
        submissions['SubmissionStatus'] = 'true'
        await submissions.save()
        res.status(200).send(submissions)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.get('/student/get-assignment/:TaskCode/:userID', async (req, res) => {
    try {
        const TaskCode = req.params.TaskCode
        const userID = req.params.userID
        const submissions = await Submission.findOne({ TaskCode, userID })
        res.set('Cache-Control', 'no-store')
        res.set('Content-Type', 'application/pdf')
        res.status(200).send(submissions.Submission)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/student/get-assignment-by-id/:TaskCode/:userID', async (req, res) => {
    try {
        const TaskCode = req.params.TaskCode
        const userID = req.params.userID
        const submissions = await Submission.findOne({ TaskCode, userID })
        res.set('Cache-Control', 'no-store')
        res.set('Content-Type', 'application/pdf')
        res.status(200).send(submissions.Submission)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router