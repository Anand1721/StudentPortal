const express = require('express')
const multer = require('multer')
const User = require('../../models/user')
const TeacherBasicDetail = require('../../models/teacher/basic-details')
const TeacherOtherDetail = require('../../models/teacher/other-details')
const AboutTeacher = require('../../models/teacher/about-teacher')
const TeacherProfile = require('../../models/teacher/teacher-profile')
const teacherAuth = require('../../middleware/auth-teacher')
const router = new express.Router()

router.get('/teacher/get-basic-details', teacherAuth, async (req, res) => {
    try {
        const teacherBasicDetails = await TeacherBasicDetail.findOne({ userID: req.teacher._id })
        res.send(teacherBasicDetails)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/teacher/get-other-details', teacherAuth, async (req, res) => {
    try {
        const teacherOtherDetails = await TeacherOtherDetail.findOne({ userID: req.teacher._id })
        res.send(teacherOtherDetails)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/teacher/get-teacher-photo/:userID', async (req, res) => {
    try {
        const userID = req.params.userID
        const teacherOtherDetails = await TeacherOtherDetail.findOne({ userID })
        res.set('Cache-Control', 'no-store')
        res.set('Content-Type', 'image/png')
        res.send(teacherOtherDetails.TeacherPhoto)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/teacher/get-resume/:userID', async (req, res) => {
    try {
        const userID = req.params.userID
        const teacherOtherDetails = await TeacherOtherDetail.findOne({ userID })
        res.set('Cache-Control', 'no-store')
        res.set('Content-Type', 'image/png')
        res.send(teacherOtherDetails.Resume)
    } catch (e) {
        res.status(500).send(e)
    }
}) 

router.get('/teacher/get-teacher-profile', teacherAuth, async (req, res) => {
    try {
        const teacherProfile = await TeacherProfile.findOne({ userID: req.teacher._id })
        res.send(teacherProfile)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/teacher/get-about', teacherAuth, async (req, res) => {
    try {
        const aboutTeacher = await AboutTeacher.findOne({ userID: req.teacher._id })
        res.send(aboutTeacher)
    } catch (e) {
        res.status(500).send()
    }
})

router.put('/teacher/put-about', teacherAuth, async (req, res) => {
    try {
        const aboutTeacher = await AboutTeacher.findOne({ userID: req.teacher._id })
        if (!aboutTeacher) {
            const abtTeacher = await new AboutTeacher({
                ...req.body,
                userID: req.teacher._id
            })
            await abtTeacher.save()
            res.status(201).send(abtTeacher)
        } else {
            aboutTeacher['AboutTeacher'] = req.body['AboutTeacher']
            await aboutTeacher.save()
            res.status(200).send(aboutTeacher)
        }
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})


const uploadTeacherPhoto = multer({
    fileFilter (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg|PNG)$/)) {
            return cb(new Error("Please upload an image!"))
        }
        cb(undefined, true)
    }
})

router.patch('/teacher/update-teacher-photo', teacherAuth, uploadTeacherPhoto.single('TeacherPhoto'), async (req, res) => {
    try {
        const userID = req.teacher._id
        buffer = req.file.buffer
        const teacherOtherDetails = await TeacherOtherDetail.findOne({ userID })
        console.log(teacherOtherDetails)
        teacherOtherDetails['TeacherPhoto'] = buffer
        await teacherOtherDetails.save()
        res.status(200).send(teacherOtherDetails)
    } catch (e) {
        res.send(e)
    }
})

const uploadResume = multer({
    fileFilter (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg|PNG)$/)) {
            return cb(new Error("Please upload an image!"))
        }
        cb(undefined, true)
    }
})

router.patch('/teacher/update-teacher-resume', teacherAuth, uploadResume.single('Resume'), async (req, res) => {
    try {
        const userID = req.teacher._id
        buffer = req.file.buffer
        const teacherOtherDetails = await TeacherOtherDetail.findOne({ userID })
        console.log(teacherOtherDetails)
        teacherOtherDetails['Resume'] = buffer
        await teacherOtherDetails.save()
        res.status(200).send(teacherOtherDetails)
    } catch (e) {
        res.send(e)
    }
})

module.exports = router