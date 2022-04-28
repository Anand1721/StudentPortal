const express = require('express')
const TeacherBasicDetail = require('../../models/teacher/basic-details')
const Classroom = require('../../models/classroom/classroom')
const Member = require('../../models/classroom/members')
const Task = require('../../models/classroom/tasks')
const teacherAuth = require('../../middleware/auth-teacher')
const crypto = require('crypto')
const Submission = require('../../models/classroom/submissions')
const router = new express.Router()

router.post('/teacher/add-classroom', teacherAuth, async (req, res) => {
    try {
        var flag = 1
        var Code = ''
        while (flag === 1) {
            Code = crypto.randomBytes(3).toString('hex');
            const classroom = await Classroom.findOne({ Code })
            if (!classroom) {
                flag = 0
            }
        }
        const userID = req.teacher._id
        const teacherBasicDetails = await TeacherBasicDetail.findOne({ userID })
        const FacultyName = teacherBasicDetails.Name
        const classroom = await new Classroom({ Code, SubjectName: req.body.SubjectName, FacultyName, userID })
        await classroom.save()
        const Username = req.teacher.username
        const member = await new Member({ Code, Username, Usertype: 'teacher', userID })
        await member.save()
        res.status(200).send({classroom, member})
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.post('/teacher/add-task', teacherAuth, async (req, res) => {
    try {
        var flag = 1
        var TaskCode = ''
        while (flag === 1) {
            TaskCode = crypto.randomBytes(3).toString('hex');
            const task = await Task.findOne({ TaskCode })
            if (!task) {
                flag = 0
            }
        }
        const task = await new Task({
            TaskCode,
            ...req.body
        })
        await task.save()
        const members = await Member.find({ Code: req.body.Code })
        members.forEach(async (member) => {
            var obj = new Object()
            obj.Code = member.Code
            obj.TaskCode = TaskCode
            obj.Username = member.Username
            obj.Usertype = member.Usertype
            obj.SubmissionStatus = 'false'
            obj.userID = member.userID
            if (obj.Usertype === 'student') {
                const s = await new Submission(obj)
                await s.save()
            }
        })
        res.status(201).send(task)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.patch('/teacher/:TaskCode/update-task-description', teacherAuth, async (req, res) => {
    try {
        const task = await Task.findOne({ TaskCode: req.params.TaskCode })
        task.TaskDescription = req.body.TaskDescription
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/teacher/:TaskCode/get-submissions', teacherAuth, async (req, res) => {
    try {
        const submissions = await Submission.find({ TaskCode: req.params.TaskCode })
        res.status(200).send(submissions)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/teacher/:Code/get-tasks', teacherAuth, async (req, res) => {
    try {
        const tasks = await Task.find({ Code: req.params.Code })
        res.status(200).send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/teacher/get-classrooms', teacherAuth, async (req, res) => {
    try {
        const classrooms = await Classroom.find({ userID: req.teacher._id })
        res.status(200).send(classrooms)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/teacher/:Code/members', teacherAuth, async (req, res) => {
    try {
        const Code = req.params.Code
        const members = await Member.find({ Code })
        res.status(200).send(members)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/teacher/:Code/change-subject-name', teacherAuth, async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['SubjectName', 'FacultyName']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid Updates!' })
        }
        const Code = req.params.Code
        const classroom = await Classroom.findOne({ Code })
        updates.forEach((update) => classroom[update] = req.body[update])
        await classroom.save()
        res.status(200).send(classroom)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/teacher/:TaskCode/delete-task', teacherAuth, async (req, res) => {
    try {
        const TaskCode = req.params.TaskCode
        await Submission.deleteMany({ TaskCode })
        await Task.deleteOne({ TaskCode })
        res.status(200).send()
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.delete('/teacher/:Code/delete-classroom', teacherAuth, async (req, res) => {
    try {
        const Code = req.params.Code
        await Submission.deleteMany({ Code })
        await Task.deleteMany({ Code })
        await Member.deleteMany({ Code })
        await Classroom.deleteOne({ Code })
        res.status(200).send()
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

module.exports = router