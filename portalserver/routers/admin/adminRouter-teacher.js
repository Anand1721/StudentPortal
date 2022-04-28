const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../../models/user')
const TeacherBasicDetail = require('../../models/teacher/basic-details')
const TeacherOtherDetail = require('../../models/teacher/other-details')
const AboutTeacher = require('../../models/teacher/about-teacher')
const TeacherProfile = require('../../models/teacher/teacher-profile')
const auth = require('../../middleware/auth')
const router = new express.Router()

router.post('/admin/add-teacher-login', auth, async (req, res) => {
    try {
        const teacherLogin = await new User(req.body)
        await teacherLogin.save()
        res.status(201).send(teacherLogin)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/admin/add-teacher-basic-details', auth, async (req, res) => {
    try {
        const teacherBasicDetail = new TeacherBasicDetail(req.body)
        await teacherBasicDetail.save()
        res.status(201).send(teacherBasicDetail)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/admin/add-teacher-other-details', auth, async (req, res) => {
    try {
        const teacherOtherDetail = new TeacherOtherDetail(req.body)
        await teacherOtherDetail.save()
        res.status(201).send(teacherOtherDetail)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/admin/add-teacher-profile', auth, async (req, res) => {
    try {
        const teacherProfile = new TeacherProfile(req.body)
        await teacherProfile.save()
        res.status(201).send(teacherProfile)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/admin/teacher-login-details/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id
        const teacher = await User.findOne({ _id })
        res.send(teacher)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/admin/teacher-basic-details/:userid', auth, async (req, res) => {
    try {
        const userID = req.params.userid
        const teacherBasicDetails = await TeacherBasicDetail.findOne({ userID })
        res.send(teacherBasicDetails)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/admin/teacher-other-details/:id', auth, async (req, res) => {
    try {
        const ID = req.params.id
        const teacherOtherDetails = await TeacherOtherDetail.findOne({ ID })
        res.send(teacherOtherDetails)
    } catch (e) {
        res.status(500).send()
    }
})

const upload = multer({
    fileFilter (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
            return cb(new Error("Please upload an image!"))
        }
        cb(undefined, true)
    }
})

router.patch('/admin/add-teacher-photo/:id', auth, upload.single('TeacherPhoto'), async (req, res) => {
    try {
        const userID = req.params.id
        buffer = req.file.buffer
        const teacherOtherDetails = await TeacherOtherDetail.findOne({ userID })
        teacherOtherDetails['TeacherPhoto'] = buffer
        const teacherProfiles = await TeacherProfile.findOne({ userID })
        teacherProfiles['TeacherPhoto'] = buffer
        await teacherOtherDetails.save()
        await teacherProfiles.save()
        res.send(teacherOtherDetails)
    } catch (e) {
        res.send(e)
    }
})

router.patch('/admin/add-resume/:id', auth, upload.single('Resume'), async (req, res) => {
    try {
        const userID = req.params.id
        buffer = req.file.buffer
        const teacherOtherDetails = await TeacherOtherDetail.findOne({ userID })
        teacherOtherDetails['Resume'] = buffer
        await teacherOtherDetails.save()
        res.send(teacherOtherDetails)
    } catch (e) {
        res.send(e)
    }
})

router.get('/admin/get-teacher-photo/:id', async (req, res) => {
    try {
        const userID = req.params.id
        const teacherOtherDetails = await TeacherOtherDetail.findOne({ userID })
        res.set('Cache-Control', 'no-store')
        res.set('Content-Type', 'image/png')
        res.send(teacherOtherDetails.TeacherPhoto)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/admin/get-resume/:id', async (req, res) => {
    try {
        const userID = req.params.id
        const teacherOtherDetails = await TeacherOtherDetail.findOne({ userID })
        res.set('Cache-Control', 'no-store')
        res.set('Content-Type', 'image/png')
        res.send(teacherOtherDetails.Resume)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/admin/delete-teacher-photo/:id', auth, async (req, res) => {
    try {
        const userID = req.params.id
        const teacherOtherDetails = await TeacherOtherDetail.findOne({ userID })
        teacherOtherDetails.TeacherPhoto = undefined
        const teacherProfiles = await TeacherProfile.findOne({ userID })
        teacherProfiles.TeacherPhoto = undefined
        res.send(teacherOtherDetails)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/admin/delete-resume/:id', auth, async (req, res) => {
    try {
        const userID = req.params.id
        const teacherOtherDetails = await TeacherOtherDetail.findOne({ userID })
        teacherOtherDetails.Resume = undefined
        res.send(teacherOtherDetails)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/admin/teacher-profile/:userid', auth, async (req, res) => {
    try {
        const userID = req.params.userid
        const teacherProfile = await TeacherProfile.findOne({ userID })
        res.send(teacherProfile)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/admin/teacher-basic-details/:userid', auth, async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const userID = req.params.userid
        const teacherBasicDetails = await TeacherBasicDetail.findOne({ userID })
        if (!teacherBasicDetails) {
            return res.status(404).send()
        }
        updates.forEach((update) => teacherBasicDetails[update] = req.body[update])
        await teacherBasicDetails.save()
        res.send(teacherBasicDetails)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/admin/teacher-other-details/:id', auth, async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const ID = req.params.id
        const teacherOtherDetails = await TeacherOtherDetail.findOne({ ID })
        if (!teacherOtherDetails) {
            return res.status(404).send()
        }
        updates.forEach((update) => teacherOtherDetails[update] = req.body[update])
        await teacherOtherDetails.save()
        res.send(teacherOtherDetails)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/admin/teacher-profile/:id', auth, async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const userID = req.params.id
        const teacherProfiles = await TeacherProfile.findOne({ userID })
        if (!teacherProfiles) {
            return res.status(404).send()
        }
        updates.forEach((update) => teacherProfiles[update] = req.body[update])
        await teacherProfiles.save()
        res.send(teacherProfiles)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/admin/delete-teacher/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id
        await TeacherBasicDetail.deleteOne({ userID: _id })
        await TeacherOtherDetail.deleteOne({ userID: _id })
        await TeacherProfile.deleteOne({ userID: _id })
        await AboutTeacher.deleteOne({ userID: _id })
        await User.deleteOne({ _id })
        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router