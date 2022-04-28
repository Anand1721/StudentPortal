const express = require('express')
const User = require('../../models/user')
const BasicDetail = require('../../models/student/basic-details')
const AdmissionDetail = require('../../models/student/admission-details')
const OtherDetail = require('../../models/student/other-details')
const StudentProfile = require('../../models/student/student-profile')
const AboutStudent = require('../../models/student/about-student')
const studentAuth = require('../../middleware/auth-student')
const multer = require('multer')
const router = new express.Router()

router.get('/student/get-basic-details', studentAuth, async (req, res) => {
    try {
        const studentBasicDetails = await BasicDetail.findOne({ userID: req.student._id })
        res.send(studentBasicDetails)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/student/get-other-details', studentAuth, async (req, res) => {
    try {
        const studentOtherDetails = await OtherDetail.findOne({ userID: req.student._id })
        res.send(studentOtherDetails)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/student/get-student-photo/:userID', async (req, res) => {
    try {
        const userID = req.params.userID
        const otherDetails = await OtherDetail.findOne({ userID })
        res.set('Cache-Control', 'no-store')
        res.set('Content-Type', 'image/png')
        res.send(otherDetails.StudentPhoto)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/student/get-school-marksheet/:userID', async (req, res) => {
    try {
        const userID = req.params.userID
        const otherDetails = await OtherDetail.findOne({ userID })
        res.set('Cache-Control', 'no-store')
        res.set('Content-Type', 'image/png')
        res.send(otherDetails.SchoolMarksheet)
    } catch (e) {
        res.status(500).send(e)
    }
}) 

router.get('/student/get-student-profile', studentAuth, async (req, res) => {
    try {
        const studentProfile = await StudentProfile.findOne({ userID: req.student._id })
        res.send(studentProfile)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/student/get-admission-details', studentAuth, async (req, res) => {
    try {
        const admissionDetails = await AdmissionDetail.findOne({ userID: req.student._id })
        res.send(admissionDetails)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/student/get-about', studentAuth, async (req, res) => {
    try {
        const aboutStudent = await AboutStudent.findOne({ userID: req.student._id })
        res.send(aboutStudent)
    } catch (e) {
        res.status(500).send()
    }
})

router.put('/student/put-about', studentAuth, async (req, res) => {
    try {
        const aboutStudent = await AboutStudent.findOne({ userID: req.student._id })
        if (!aboutStudent) {
            const abtStudent = await new AboutStudent({
                ...req.body,
                userID: req.student._id
            })
            await abtStudent.save()
            res.status(201).send(abtStudent)
        } else {
            aboutStudent['AboutStudent'] = req.body['AboutStudent']
            await aboutStudent.save()
            res.status(200).send(aboutStudent)
        }
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

const upload = multer({
    fileFilter (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg|PNG)$/)) {
            return cb(new Error("Please upload an image!"))
        }
        cb(undefined, true)
    }
})

router.patch('/student/update-student-photo', studentAuth, upload.single('StudentPhoto'), async (req, res) => {
    try {
        const userID = req.student._id
        buffer = req.file.buffer
        const otherDetails = await OtherDetail.findOne({ userID })
        console.log(otherDetails)
        otherDetails['StudentPhoto'] = buffer
        const studentProfiles = await StudentProfile.findOne({ userID })
        studentProfiles['StudentPhoto'] = buffer
        await otherDetails.save()
        await studentProfiles.save()
        res.status(200).send(otherDetails)
    } catch (e) {
        res.send(e)
    }
})

const uploadMarksheet = multer({
    fileFilter (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg|PNG)$/)) {
            return cb(new Error("Please upload an image!"))
        }
        cb(undefined, true)
    }
})

router.patch('/student/update-school-marksheet', studentAuth, uploadMarksheet.single('SchoolMarksheet'), async (req, res) => {
    try {
        const userID = req.student._id
        buffer = req.file.buffer
        const otherDetails = await OtherDetail.findOne({ userID })
        console.log(otherDetails)
        otherDetails['SchoolMarksheet'] = buffer
        await otherDetails.save()
        res.status(200).send(otherDetails)
    } catch (e) {
        res.send(e)
    }
})

router.get('/student/get-id', studentAuth, async (req, res) => {
    try {
        res.status(200).send(req.student._id)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router