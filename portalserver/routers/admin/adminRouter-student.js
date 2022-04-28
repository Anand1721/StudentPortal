const express = require('express')
const multer = require('multer')
const User = require('../../models/user')
const BasicDetail = require('../../models/student/basic-details')
const AdmissionDetail = require('../../models/student/admission-details')
const OtherDetail = require('../../models/student/other-details')
const StudentProfile = require('../../models/student/student-profile')
const AboutStudent = require('../../models/student/about-student')
require('mongoose')
const auth = require('../../middleware/auth')
const router = new express.Router()

router.post('/admin/add-student-login', auth, async (req, res) => {
    try {
        const studentLogin = await new User(req.body)
        await studentLogin.save()
        res.status(201).send(studentLogin)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/admin/add-student-basic-details', auth, async (req, res) => {
    try {
        const basicDetail = await new BasicDetail(req.body)
        await basicDetail.save()
        res.status(201).send(basicDetail)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/admin/add-student-admission-details', auth, async (req, res) => {
    try {
        const admissionDetail = await new AdmissionDetail(req.body)
        await admissionDetail.save()
        res.status(201).send(admissionDetail)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/admin/add-student-other-details', auth, async (req, res) => {
    try {
        const otherDetail = await new OtherDetail(req.body)
        await otherDetail.save()
        res.status(201).send(otherDetail)
    } catch (e) {
        res.status(400).send(e)
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

router.patch('/admin/add-student-photo/:id', auth, upload.single('StudentPhoto'), async (req, res) => {
    try {
        const userID = req.params.id
        buffer = req.file.buffer
        console.log(buffer)
        const otherDetails = await OtherDetail.findOne({ userID })
        otherDetails['StudentPhoto'] = buffer
        console.log(otherDetails.StudentPhoto)
        const studentProfiles = await StudentProfile.findOne({ userID })
        studentProfiles['StudentPhoto'] = buffer
        await otherDetails.save()
        await studentProfiles.save()
        res.send(otherDetails)
    } catch (e) {
        res.send(e)
    }
})

router.patch('/admin/add-school-marksheet/:id', auth, upload.single('SchoolMarksheet'), async (req, res) => {
    try {
        const userID = req.params.id
        buffer = req.file.buffer
        const otherDetails = await OtherDetail.findOne({ userID })
        otherDetails['SchoolMarksheet'] = buffer
        await otherDetails.save()
        res.send(otherDetails)
    } catch (e) {
        res.send(e)
    }
})

router.get('/admin/get-student-photo/:id', async (req, res) => {
    try {
        const userID = req.params.id
        const otherDetails = await OtherDetail.findOne({ userID })
        res.set('Cache-Control', 'no-store')
        res.set('Content-Type', 'image/png')
        res.send(otherDetails.StudentPhoto)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/admin/get-school-marksheet/:id', async (req, res) => {
    try {
        const userID = req.params.id
        const otherDetails = await OtherDetail.findOne({ userID })
        res.set('Cache-Control', 'no-store')
        res.set('Content-Type', 'image/png')
        res.send(otherDetails.SchoolMarksheet)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/admin/delete-student-photo/:id', auth, async (req, res) => {
    try {
        const userID = req.params.id
        const otherDetails = await OtherDetail.findOne({ userID })
        otherDetails.StudentPhoto = undefined
        const studentProfiles = await StudentProfile.findOne({ userID })
        studentProfiles.StudentPhoto = undefined
        res.send(otherDetails)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/admin/delete-school-marksheet/:id', auth, async (req, res) => {
    try {
        const userID = req.params.id
        const otherDetails = await OtherDetail.findOne({ userID })
        otherDetails.SchoolMarksheet = undefined
        res.send(otherDetails)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/admin/add-student-profile', auth, async (req, res) => {
    try {
        const studentProfile = await new StudentProfile(req.body)
        await studentProfile.save()
        res.status(201).send(studentProfile)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/admin/student-login-details/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id
        const student = await User.findOne({ _id })
        res.send(student)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/admin/student-basic-details/:id', auth, async (req, res) => {
    try {
        const userID = req.params.id
        const basicDetails = await BasicDetail.findOne({ userID })
        res.send(basicDetails)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/admin/student-admission-details/:rno', auth, async (req, res) => {
    try {
        const RegistrationNumber = req.params.rno
        const admissionDetails = await AdmissionDetail.findOne({ RegistrationNumber })
        res.send(admissionDetails)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/admin/student-other-details/:id', auth, async (req, res) => {
    try {
        const userID = req.params.id
        const otherDetails = await OtherDetail.findOne({ userID })
        res.send(otherDetails)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/admin/student-profile/:id', auth, async (req, res) => {
    try {
        const userID = req.params.id
        const studentProfile = await StudentProfile.findOne({ userID })
        res.send(studentProfile)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/admin/student-login-details/:id', auth, async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['username', 'password']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid Updates!' })
        }
        const _id = req.params.id
        const student = await User.findOne({ _id })
        if (!student) {
            return res.status(404).send()
        }
        if (updates['password'] === '') {
            student['username'] = req.body['username']
        } else {
            updates.forEach((update) => student[update] = req.body[update])
        }
        await student.save()
        res.send(student)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/admin/student-basic-details/:id', auth, async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const userID = req.params.id
        const basicDetails = await BasicDetail.findOne({ userID })
        if (!basicDetails) {
            return res.status(404).send()
        }
        updates.forEach((update) => basicDetails[update] = req.body[update])
        await basicDetails.save()
        res.send(basicDetails)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/admin/student-admission-details/:id', auth, async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const userID = req.params.id
        const admissionDetails = await AdmissionDetail.findOne({ userID })
        if (!admissionDetails) {
            return res.status(404).send()
        }
        updates.forEach((update) => admissionDetails[update] = req.body[update])
        await admissionDetails.save()
        res.send(admissionDetails)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/admin/student-other-details/:id', auth, async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const userID = req.params.id
        const otherDetails = await OtherDetail.findOne({ userID })
        if (!otherDetails) {
            return res.status(404).send()
        }
        updates.forEach((update) => otherDetails[update] = req.body[update])
        await otherDetails.save()
        res.send(otherDetails)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/admin/student-profile/:id', auth, async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        const userID = req.params.id
        const studentProfiles = await StudentProfile.findOne({ userID })
        if (!studentProfiles) {
            return res.status(404).send()
        }
        updates.forEach((update) => studentProfiles[update] = req.body[update])
        await studentProfiles.save()
        res.send(studentProfiles)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/admin/delete-student/:id', auth, async (req, res) => {
    try {
        const _id = req.params.id
        await BasicDetail.deleteOne({ userID: _id })
        await AdmissionDetail.deleteOne({ userID: _id })
        await OtherDetail.deleteOne({ userID: _id })
        await StudentProfile.deleteOne({ userID: _id })
        await AboutStudent.deleteOne({ userID: _id })
        await User.deleteOne({ _id })
        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router